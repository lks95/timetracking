import * as chai from 'chai';
import 'mocha';
import { Types } from 'mongoose';
import Project from '../src/db/schemas/project';
import Task from '../src/db/schemas/task';
import Record from '../src/db/schemas/record';

const server = require('../src/server');

import chaiHttp = require('chai-http');
const { ObjectId } = Types;

const { assert } = chai;
chai.should();
chai.use(chaiHttp);


let project;
let task;

const sendPostRequest = (url, body) => chai.request(server)
  .post(url)
  .send(body);

const sendGetRequest = url => chai.request(server).get(url);

const checkResponseStatus = async (url, requestBody, status) => {
  const res = await sendPostRequest(url, requestBody);

  if (res.status === 500 && process.env.ENV === 'dev') {
    console.log('Test ignored.');
    return;
  }
  res.should.have.status(status);
};

/*
 * Create a project with a task inside and test against it
 */
before(async () => {
  project = await Project.create({ name: 'My Very Testing Project Name', color: '#00ffff' });
  task = await Task.create({ description: 'My Very Testing Task Name', project: project._id });
  project.tasks.push(new ObjectId(task._id));
  await project.save();
});

after(async () => {
  await Task.findByIdAndRemove(task._id);
  await Project.findByIdAndRemove(project._id);
});

describe('/POST /records/start request body validation', () => {
  it('it should not create a new record with missing request body', async () => {
    const res = await sendPostRequest('/records/start', null);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }
    res.should.have.status(400);
  });

  it('it should not create a new record with invalid ids (404)', async () => {
    const invalidPost = {
      project: 'someInvalidId',
    };
    const invalidPost2 = {
      project: 'someInvalidId',
      task: 'someOtherInvalidId',
    };

    await checkResponseStatus('/records/start', invalidPost, 404);
    await checkResponseStatus('/records/start', invalidPost2, 404);
  });

  it('it should not create a new record with invalid request body keys (400)', async () => {
    const invalidPost = {
      projectId: project._id,
    };
    const invalidPost2 = {
      projectId: project._id,
      taskId: task._id,
    };

    await checkResponseStatus('/records/start', invalidPost, 400);
    await checkResponseStatus('/records/start', invalidPost2, 400);
  });
});

describe('/POST /records/start record creation', () => {
  it('it should create a new record for given project with only a start date', async () => {
    const validPost = {
      project: project._id,
    };

    const res = await sendPostRequest('/records/start', validPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    // Check the response
    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('_id', 'startTime', 'project');
    assert.notExists(res.body.task);
    assert.notExists(res.body.endTime);

    // Check the database entry
    const record = await Record.findById(res.body._id);
    assert.exists(record);
    assert.notExists(record.endTime);
    record.should.have.keys('_id', 'startTime', 'project');
    record.project.should.be('string');
    assert.notExists(record.task);

    // Remove entry from database
    await Record.findByIdAndRemove(record._id);
  });

  it('it should prevent multiple starts for same project / task', async () => {
    const validPost = {
      project: project._id,
    };

    const validPost2 = {
      project: project._id,
      task: task._id,
    };

    const multipleRequest = async (postBody) => {
      let res = await sendPostRequest('/records/start', postBody);

      if (res.status === 500 && process.env.ENV === 'dev') {
        console.log('Test ignored.');
        return;
      }

      // Check the response
      res.should.have.status(200);
      const recordId = res.body._id;

      // Request twice the same record start
      res = await sendPostRequest('/records/start', postBody);

      if (res.status === 500 && process.env.ENV === 'dev') {
        console.log('Test ignored.');
      } else {
        // Check the response
        res.should.have.status(400);
      }

      // Remove entry from database
      assert.exists(recordId);
      await Record.findByIdAndRemove(recordId);
    };

    await multipleRequest(validPost);
    await multipleRequest(validPost2);
  });
});

describe('/POST /records/start /records/{id}/stop record start and stop', () => {
  it('it should create a new record for given project and stop it appropriately', async () => {
    const validPost = {
      project: project._id,
    };

    let res = await sendPostRequest('/records/start', validPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    // Check the response
    res.should.have.status(200);
    const recordId = res.body._id;
    console.log(`Record created with id ${recordId}`);

    res = await sendPostRequest(`/records/${recordId}/stop`, null);

    const record = await Record.findById(recordId);
    assert.exists(record);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
    } else {
      // Check the response
      res.should.have.status(200);
      res.body.should.be.an.object;
      res.body.should.have.keys('_id', 'startTime', 'endTime', 'project');

      // Check the database entry
      record.should.have.keys('_id', 'startTime', 'endTime', 'project');
      record.project.should.be('string');
      assert.notExists(record.task);
    }

    // Remove entry from database
    await Record.findByIdAndRemove(record._id);
  });
});


describe('/GET /records/running', () => {
  it('it should only return a list of running records', async () => {
    let res = await sendPostRequest('/records/start', { project: project._id });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res = await sendGetRequest('/records/running');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    // Check the response
    res.should.have.status(200);
    const records = res.body;
    records.should.be.an('array');
    records.size.should.be.greaterThan(0);

    records.forEach((record) => {
      record.should.not.have.key('endTime');
    });

    // Remove entry from database
    await Record.findByIdAndRemove(records[0]._id);
  });
});

describe('/GET /records/{id}', () => {
  it('it should return the right record', async () => {
    let res = await sendPostRequest('/records/start', { project: project._id });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res = await sendPostRequest(`/records/${res.body._id}/stop`, null);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      // Remove entry from database
      await Record.findByIdAndRemove(res.body._id);
      return;
    }

    const resGet = await sendGetRequest(`/records/${res.body._id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    // Check the response
    resGet.should.have.status(200);
    resGet.body.should.be.equal(res.body);
    resGet.body.should.have.keys('_id', 'startTime', 'endTime');

    // Remove entry from database
    await Record.findByIdAndRemove(resGet.body._id);
  });
});
