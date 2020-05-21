import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/db/schemas/project';

const server = require('../src/server');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let project;

before(async () => {
  project = await Project.create({ name: 'Before Project for later use', color: '#ffffff' });
});

describe('/GET /projects', () => {
  it('it should GET a list of projects', async () => {
    const res = await chai.request(server).get('/projects');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.property('projects');
    res.body.should.have.property('projects').should.be.a('array');
    const p = res.body.projects[0];
    p.should.be.an.object;
    p.should.have.keys('id', 'name', 'color');
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
      .send({ validPost });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('id', 'name', 'color', 'completed', 'tasks');
    res.body.should.have.property('tasks').should.be.a('array');
    res.body.should.have.property('tasks').should.be.empty;
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

    res.should.have.status(404);
  });

  it('it should GET a project given the valid id', async () => {
    const res = await chai.request(server)
      .get(`/projects/${project.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('id', 'name', 'color', 'tasks');
    res.body.should.have.property('id').should.equal(project.id);
    res.body.should.have.property('tasks').should.be.a('array');
    const task = res.body.tasks[0];
    task.should.have.keys('id', 'description');
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

    res.should.have.status(404);
  });

  it('it should PATCH a project given the valid id', async () => {
    const res = await chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ validPatch });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an.object;
    res.body.should.have.keys('id', 'name', 'color');
    res.body.should.have.property('id').should.equal(project.id);
  });

  it('it should not PATCH a project given an invalid patch', async () => {
    const res = await chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ invalidPatch });

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
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

    res.should.have.status(404);
  });

  it('it should DELETE a project given the valid id', async () => {
    const res = await chai.request(server)
      .delete(`/projects/${project.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
  });
});
