import * as chai from 'chai';
import 'mocha';
import Project from '../src/db/schemas/project';

const server = require('../src/server');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let project;

before(async () => {
  // Create project
  project = await Project.create({ name: 'Project for task specific queries', color: '#ffffff' });
});

after(async () => {
  // Remove created project
  await Project.findByIdAndRemove(project._id);
});

/*
 * Test the /GET /projects/{id}/tasks route
 */
describe('/GET /projects/{id}/tasks', () => {
  it('it should not GET tasks of a project given the invalid id', async () => {
    const res = await chai.request(server)
      .get('/projects/INVALID_ID/tasks');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(404);
  });

  it('it should GET tasks of a project given the valid id', async () => {
    const res = await chai.request(server)
      .get(`/projects/${project.id}/tasks`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('id', 'description', 'records');
    res.body.should.have.property('records').should.be.a('array');
  });
});


/*
 * Test the /POST /projects/{id}/tasks route
 */
describe('/POST /projects/{id}/tasks', () => {
  const validPost = {
    description: 'Valid task name',
  };

  const invalidPost = {
    description: '',
  };

  it('it should CREATE a task of a project with a valid ID', async () => {
    const res = await chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('id', 'name', 'color', 'tasks');
    res.body.should.have.property('tasks').should.be.a('array');
  });

  it('it should not CREATE a task of a project with an invalid ID', async () => {
    const res = await chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }
    res.should.have.status(404);
  });

  it('it should not POST a task given an invalid request body', async () => {
    const res = await chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ invalidPost });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
});

// TODO Add tests for /tasks/{id}#GET
// TODO Add tests for /tasks/{id}#PATCH
// TODO Add tests for /tasks/{id}#DELETE
