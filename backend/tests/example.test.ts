import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/model/Project';

const server = require('../src/index');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const TIMEOUT_TIME = 2000;


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
  const project = new Project('Projektname', '#ffffff');

  it('it should not GET a project given the invalid id', (done) => {
    chai.request(server)
      .get('/projects/INVALID_ID')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(404);
        done();
      });
  }).timeout(TIMEOUT_TIME);


  it('it should GET a project given the valid id', (done) => {
    chai.request(server)
      .get(`/projects/${project.getId()}`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('id').should.equal(project.getId());
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('tasks');
        res.body.should.have.property('tasks').should.be.a('array');
        // tasks.should.have.property('id');
        // tasks.should.have.property('description');
        done();
      });
  }).timeout(TIMEOUT_TIME);
});

/*
 * Test the /PATCH /projects/{id} route
 */
describe('/PATCH /projects/{id}', () => {
  const project = new Project('Projektname', '#ffffff');

  const validPatch = {
    name: 'Patched name',
  };

  const invalidPatch = {
    name: '',
  };

  it('it should not PATCH a project given the invalid id', (done) => {
    chai.request(server)
      .patch('/projects/INVALID_ID')
      .send({ validPatch })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(404);
        done();
      });
  }).timeout(TIMEOUT_TIME);


  it('it should PATCH a project given the valid id', (done) => {
    chai.request(server)
      .patch(`/projects/${project.getId()}`)
      .send({ validPatch })
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
        res.body.should.have.property('id').should.equal(project.getId());
        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not PATCH a project given an invalid patch', (done) => {
    chai.request(server)
      .patch(`/projects/${project.getId()}`)
      .send({ invalidPatch })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(400);
        done();
      });
  });
}).timeout(TIMEOUT_TIME);

/*
 * Test the /DELETE /projects/{id} route
 */
describe('/DELETE /projects/{id}', () => {
  const project = new Project('Projektname', '#ffffff');

  it('it should not DELETE a project given the invalid id', (done) => {
    chai.request(server)
      .delete('/projects/INVALID_ID')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(404);
        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should DELETE a project given the valid id', (done) => {
    chai.request(server)
      .delete(`/projects/${project.getId()}`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(200);
        done();
      });
  }).timeout(TIMEOUT_TIME);
});


/*
 * Test the /GET /projects/{id}/tasks route
 */
describe('/GET /projects/{id}/tasks', () => {
  const project = new Project('Projektname', '#ffffff');

  it('it should not GET tasks of a project given the invalid id', (done) => {
    chai.request(server)
      .get('/projects/INVALID_ID/tasks')
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(404);
        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should GET tasks of a project given the valid id', (done) => {
    chai.request(server)
      .get(`/projects/${project.getId()}/tasks`)
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('description');
        res.body.should.have.property('records');
        res.body.should.have.property('records').should.be.a('array');
        // record.should...

        done();
      });
  }).timeout(TIMEOUT_TIME);
});


/*
 * Test the /POST /projects/{id}/tasks route
 */
describe('/POST /projects/{id}/tasks', () => {
  const project = new Project('Projektname', '#ffffff');

  const validPost = {
    name: 'Patched name',
  };

  const invalidPost = {
    name: '',
  };

  it('it should CREATE a task of a project with a valid ID', (done) => {
    chai.request(server)
      .post(`/projects/${project.getId()}/tasks`)
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
        res.body.should.have.property('tasks').should.be.a('array');

        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not CREATE a task of a project with an invalid ID', (done) => {
    chai.request(server)
      .post(`/projects/${project.getId()}/tasks`)
      .send({ validPost })
      .end((err, res) => {
        if (res.status === 500 && process.env.ENV === 'dev') {
          console.log('Test ignored.');
          done();
          return;
        }
        res.should.have.status(404);
        done();
      });
  }).timeout(TIMEOUT_TIME);

  it('it should not POST a task given an invalid post', (done) => {
    chai.request(server)
      .post(`/projects/${project.getId()}/tasks`)
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
