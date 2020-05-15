import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Task from '../src/model/Task';

const server = null;

import chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);


describe('OK', () => {
  it('should be OK', () => {
    const result = 'OK';
    expect(result).to.equal('OK');
  });

  it('should not be NOT OK', () => {
    const result = 'OK';
    expect(result).to.not.equal('NOT OK');
  });
});

/*
 * Test the /GET /projects route
 */
describe('/GET /projects', () => {
  const projects = new Array();

  it('it should GET a list of projects', (done) => {
    chai.request(server)
      .get('/projects/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('projects');
        res.body.should.have.property('projects').should.be.a('array');
        const project = res.body.projects[0];
        project.should.have.keys('id', 'name', 'color');
        done();
      });
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
  });

  it('it should not CREATE a project', (done) => {
    chai.request(server)
      .post('/projects')
      .send({ invalidPost })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

/*
 * Test the /GET /projects/{id} route
 */
describe('/GET /projects/{id}', () => {
  const project = new Project('Projektname');

  it('it should not GET a project given the invalid id', (done) => {
    chai.request(server)
      .get('/projects/INVALID_ID')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });


  it('it should GET a project given the valid id', (done) => {
    chai.request(server)
      .get(`/projects/${project.id}`)
      .end((err, res) => {
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
        done();
      });
  });
});

/*
 * Test the /PATCH /projects/{id} route
 */
describe('/PATCH /projects/{id}', () => {
  const project = new Project('Projektname');

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
        res.should.have.status(404);
        done();
      });
  });


  it('it should PATCH a project given the valid id', (done) => {
    chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ validPatch })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('id').should.equal(project.id);
        done();
      });
  });

  it('it should not PATCH a project given an invalid patch', (done) => {
    chai.request(server)
      .patch(`/projects/${project.id}`)
      .send({ invalidPatch })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

/*
 * Test the /DELETE /projects/{id} route
 */
describe('/DELETE /projects/{id}', () => {
  const project = new Project('Projektname');

  it('it should not DELETE a project given the invalid id', (done) => {
    chai.request(server)
      .delete('/projects/INVALID_ID')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should DELETE a project given the valid id', (done) => {
    chai.request(server)
      .delete(`/projects/${project.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


/*
 * Test the /GET /projects/{id}/tasks route
 */
describe('/GET /projects/{id}/tasks', () => {
  const project = new Project('Projektname');

  it('it should not GET tasks of a project given the invalid id', (done) => {
    chai.request(server)
      .get('/projects/INVALID_ID/tasks')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should GET tasks of a project given the valid id', (done) => {
    chai.request(server)
      .get(`/projects/${project.id}/tasks`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('description');
        res.body.should.have.property('records');
        res.body.should.have.property('records').should.be.a('array');
        // record.should...

        done();
      });
  });
});


/*
 * Test the /POST /projects/{id}/tasks route
 */
describe('/POST /projects/{id}/tasks', () => {
  const project = new Project('Projektname');

  const validPost = {
    name: 'Patched name',
  };

  const invalidPost = {
    name: '',
  };

  it('it should CREATE a task of a project with a valid ID', (done) => {
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an.object;
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('color');
        res.body.should.have.property('completed');
        res.body.should.have.property('tasks').should.be.a('array');


        done();
      });
  });

  it('it should not CREATE a task of a project with an invalid ID', (done) => {
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ validPost })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should not POST a task given an invalid post', (done) => {
    chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send({ invalidPost })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});


describe('Task', () => {
  const task = new Task();
  it('should be an object', () => {
    expect(task).to.be.an('object');
  });
  it('should be by default not completed', () => {
    expect(task.isCompleted()).to.be.false;
  });
  it('should be by default not completed', () => {
    expect(task.getDescription()).to.be.empty;
  });
});
