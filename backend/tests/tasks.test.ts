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
  // Create project
  project = await Project.create({ name: 'Project for task specific queries', color: '#ffffff' });

  // Add a task to it
  task = await Task.create({ project: project._id, description: 'A task description', completed: 'false' });
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

    res.should.have.status(400);
  });

  it('it should GET tasks of a project given the valid id', async () => {
    const res = await chai.request(server)
      .get(`/projects/${project.id}/tasks`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.be.an('array');
    res.body.length.should.equal(1);

    const t = res.body[0];
    t.should.have.property('_id');
    t.should.have.property('description');
    t.should.have.property('records');
    t.records.should.be.a('array');
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
      .send(validPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('description');
    res.body.should.have.property('records');
    res.body.records.should.be.a('array');
  });

  it('it should not CREATE a task of a project with an invalid ID', async () => {
    const res = await chai.request(server)
      .post('/projects/INVALID_ID/tasks')
      .send(validPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }
    res.should.have.status(404);
  });

  it('it should not POST a task given an invalid request body', async () => {
    const res = await chai.request(server)
      .post(`/projects/${project.id}/tasks`)
      .send(invalidPost);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
});


describe('/GET /tasks/{id}', () => {
  it('it should NOT GET a task with invalid id', async () => {
    const res = await chai.request(server)
      .get('/tasks/INVALID_ID');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });

  it('it should GET a task with a valid id', async () => {
    const res = await chai.request(server)
      .get(`/tasks/${task.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('description');
    res.body.should.have.property('project');
    res.body.should.have.property('records');
    res.body.should.have.property('completed');
    res.body.records.should.be.a('array');
  });
});


// Test the PATCH from /projects/{id}/tasks/{task-id}
describe('/PATCH /tasks/{task-id}', () => {
  const validPatch = {
    description: 'A new description for the task',
  };

  const invalidPatch = {
    description: '',
  };

  it('should not PATCH a task with an invalid id and valid request body', async () => {
    const res = await chai.request(server)
      .patch('/tasks/INVALID_ID')
      .send(validPatch);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });

  it('should PATCH a project with a task which is given a valid id', async () => {
    const res = await chai.request(server)
      .patch(`/tasks/${task._id}`)
      .send(validPatch);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('description');
    res.body.should.have.property('completed');
    res.body.description.should.equal(validPatch.description);
    // TODO Check if the patch applied correctly
  });

  it('should NOT PATCH a task with a valid id and an invalid request body', async () => {
    const res = await chai.request(server)
      .patch(`/tasks/${task._id}`)
      .send(invalidPatch);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    res.should.have.status(400);
  });
});

// Test the DELETE from /projects/{id}/tasks/{task-id}
describe('/DELETE /tasks/{task-id}', () => {
  it('should NOT DELETE a project with a task which is given the invalid id', async () => {
    const res = await chai.request(server)
      .delete('/tasks/INVALID_ID');

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }
    res.should.have.status(404);
  });

  it('should DELETE a task with a valid id', async () => {
    const res = await chai.request(server)
      .delete(`/tasks/${task.id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }

    // TODO Check if status code is correct
    res.should.have.status(204);

    // TODO Check if task was removed from database
    // TODO Check if task was removed from projects tasks
  });

  it('should not DELETE a deleted task with a valid id', async () => {
    const res = await chai.request(server)
      .delete(`/tasks/${task._id}`);

    if (res.status === 500 && process.env.ENV === 'dev') {
      console.log('Test ignored.');
      return;
    }
    res.should.have.status(404);
  });
});
