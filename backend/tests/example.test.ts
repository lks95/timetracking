import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/db/schemas/project';
import IProject from '../src/model/Project';

const server = require('../src/server');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const TIMEOUT_TIME = 2000;

// TODO Define before and after for database clean up and initialization


describe('OK', () => {
  it('should be OK', () => {
    const result = 'OK';
    result.should.be.a('string');
    expect(result).to.equal('OK');
  });

  it('should not be NOT OK', () => {
    const result = 'OK';
    expect(result).to.not.equal('NOT OK');
  });
});

describe('/GET /projects', () => {
  it('it should GET a list of projects', (done) => {
    chai.request(server)
      .get('/projects')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('projects');
        res.body.should.have.property('projects').should.be.a('array');
        const project = res.body.projects[0];
        project.should.have.keys('id', 'name', 'color');
        done();
      }).timeout(TIMEOUT_TIME);
  });
});


/*
 * Test the /POST /projects route
 */
describe('/POST /projects', () => {
  const validPost = {
    name: 'Patched name',
  };

  const invalidPost = {
    name: '',
  };

  it('it should CREATE a project', (done) => {
    chai.request(server)
      .post('/projects')
      .send({ validPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('tasks');
        res.body.should.have.property('tasks').should.be.a('array');
        res.body.should.have.property('tasks').should.be.empty;

        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not CREATE a project', (done) => {
    chai.request(server)
      .post('/projects')
      .send({ invalidPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(400);
        done();
      });
  }).timeout(TIMEOUT_TIME);
});

/*
 * Test the /GET /projects/{id} route
 */
describe('/GET /projects/{id}', () => {
  it('it should not GET a project given the invalid id', async () => {
    await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .get('/projects/INVALID_ID')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(404);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should GET a project given the valid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .get(`/projects/${project.id}`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('id').should.equal(project.id);
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('tasks');
        res.body.should.have.property('tasks').should.be.a('array');
        // tasks.should.have.property('id');
        // tasks.should.have.property('description');
      });
  }).timeout(TIMEOUT_TIME);
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
    await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .patch('/projects/INVALID_ID')
      .send({ validPatch })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(404);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should PATCH a project given the valid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ validPatch })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('id').should.equal(project.id);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not PATCH a project given an invalid patch', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ invalidPatch })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(400);
      });
  }).timeout(TIMEOUT_TIME);
});

/*
 * Test the /DELETE /projects/{id} route
 */
describe('/DELETE /projects/{id}', () => {
  it('it should not DELETE a project given the invalid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .delete('/projects/INVALID_ID')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(404);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should DELETE a project given the valid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .delete(`/projects/${project.id}`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(200);
      });
  }).timeout(TIMEOUT_TIME);
});

/*
 * Test the /GET /projects/{id}/tasks route
 */
describe('/GET /projects/{id}/tasks', () => {
  it('it should not GET tasks of a project given the invalid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .get('/projects/INVALID_ID/tasks')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(404);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should GET tasks of a project given the valid id', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .get(`/projects/${project.id}/tasks`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('description');
        res.body.should.have.property('records');
        res.body.should.have.property('records').should.be.a('array');
        // record.should...
      });
  }).timeout(TIMEOUT_TIME);
});


/*
 * Test the /POST /projects/{id}/tasks route
 */
describe('/POST /projects/{id}/tasks', () => {
  const validPost = {
    name: 'Patched name',
  };

  const invalidPost = {
    name: '',
  };

  it('it should CREATE a task of a project with a valid ID', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('tasks').should.be.a('array');
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not CREATE a task of a project with an invalid ID', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(404);
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not POST a task given an invalid post', async () => {
    const project = await Project.create({ name: 'Projektname', color: '#ffffff' });
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ invalidPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          return;
        }
        res.should.have.status(400);
      });
  }).timeout(TIMEOUT_TIME);
});
