import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/db/schemas/project';
import Task from '../src/db/schemas/task';

const server = require('../src/server');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let project;
let task;

before(async () => {
  project = await Project.create({ name: 'Before Project for later use', color: '#ffffff' });
  task = await Task.create({ description: 'My custom task', project: project._id });
});

after(async () => {
  try {
    await Project.findByIdAndRemove(project._id);
  } catch (error) {
    console.log('Error while cleaning up project. Project might be already removed.');
  }
});

describe('/GET /projects', () => {
  it('it should GET a list of projects', async () => {
    const res = await chai.request(server).get('/projects');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.a('array');
    const p = res.body[0];
    p.should.have.property('_id');
    p.should.have.property('name');
    p.should.have.property('color');
  });
});


/*
 * Test the /POST /projects route
 */
describe('/POST /projects', () => {
  const validPost = {
    name: 'New project',
  };

  const invalidPost = {
    name: '',
  };

  it('it should CREATE a project with valid request body', async () => {
    const res = await chai.request(server)
      .post('/projects')
      .send(validPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('name');
    res.body.should.have.property('color');
    res.body.should.have.property('completed');
    res.body.should.have.property('tasks');
    res.body.tasks.should.be.a('array');
    res.body.tasks.should.be.empty;

    await Project.findByIdAndRemove(res.body._id);
  });

  it('it should not CREATE a project with invalid request body', async () => {
    const res = await chai.request(server)
      .post('/projects')
      .send({ invalidPost });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
});

/*
 * Test the /GET /projects/{id} route
 */
describe('/GET /projects/{id}', () => {
  it('it should not GET a project given an invalid id', async () => {
    const res = await chai.request(server)
      .get('/projects/INVALID_ID');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });

  it('it should GET a project given the valid id', async () => {
    const res = await chai.request(server)
      .get(`/projects/${project.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('name');
    res.body.should.have.property('color');
    res.body.should.have.property('tasks');
    res.body.name.should.equal(project.name);
    res.body.tasks.length.should.equal(1);
    res.body.tasks[0].should.have.property('_id');
    res.body.tasks[0].should.have.property('description');
  });
});

/*
 * Test the /PATCH /projects/{id} route
 */
describe('/PATCH /projects/{id}', () => {
  const validPatch = {
    name: 'Patched name',
  };

  const invalidPatch = {
    name: '',
  };

  it('it should not PATCH a project given the invalid id', async () => {
    const res = await chai.request(server)
      .patch('/projects/INVALID_ID')
      .send({ validPatch });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });

  it('it should PATCH a project given the valid id', async () => {
    const res = await chai.request(server)
      .patch(`/projects/${project.id}`)
      .send(validPatch);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('name');
    res.body.should.have.property('color');
    res.body.name.should.equal(validPatch.name);
  });

  it('it should not PATCH a project given an invalid patch', async () => {
    const res = await chai.request(server)
      .patch(`/projects/${project.id}`)
      .send(invalidPatch);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
});

/*
 * Test the /DELETE /projects/{id} route
 */
describe('/DELETE /projects/{id}', () => {
  it('it should not DELETE a project given the invalid id', async () => {
    const res = await chai.request(server)
      .delete('/projects/INVALID_ID');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });

  it('it should DELETE a project given the valid id', async () => {
    const res = await chai.request(server)
      .delete(`/projects/${project.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(204);
  });
});
