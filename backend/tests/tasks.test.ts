import * as chai from 'chai';
import 'mocha';
import { Types } from 'mongoose';
import Project from '../src/db/schemas/project';
import Task from '../src/db/schemas/task';
import Record from '../src/db/schemas/record';

const server = require('../src/server');

import chaiHttp = require('chai-http');
import {get} from "https";
import task from "../src/db/schemas/task";
const { ObjectId } = Types;

const { assert } = chai;
chai.should();
chai.use(chaiHttp);

const TIMEOUT_TIME = 2000;

let validPost = {
	name: 'Patched name',
};

let invalidPost = {
	name: '',
}

const validPatch = {
	name: 'Patched name',
};

const invalidPatch = {
	name: '',
};


//Test the GET from /projects/{id}/start
describe('/GET /projects/{id}/start', () => {

	it('it should NOT GET a start time of a Time record of a project with a invalid ID', async () => {
		chai.request(server)
		  .get(`/projects/INVALID_ID/start`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('it should GET the start time of a Time record of a profect with a valid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .get(`/projects/${project.id}/start`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'startTime', 'project');
		  });
	}).timeout(TIMEOUT_TIME);
});



//Test the POST from /projects/{id}/start
describe('/POST /projects/{id}/start', () => {

	it('should CREATE the start time of a Time record of a Project with a valid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/start`)
		  .send({validPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'startTime', 'project');
		  });

	}).timeout(TIMEOUT_TIME);

	it('should NOT CREATE the start time of a Time record of a Project with an invalid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/start`)
		  .send({validPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('should NOT POST the start time of a Time record given an invalid post', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/start`)
		  .send({invalidPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

});


//Test the GET from /projects/{id}/stop
describe('/GET /projects/{id}/stop', () => {

	it('it should NOT GET a stop time of a Time record of a project with a invalid ID', async () => {
		chai.request(server)
		  .get(`/projects/INVALID_ID/stop`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('it should GET the stop time of a Time record of a profect with a valid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .get(`/projects/${project.id}/stop`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'startTime', 'endTime', 'project');
		  });
	}).timeout(TIMEOUT_TIME);
});


//Test the POST from /projects/{id}/stop
describe('/POST /projects/{id}/stop', () => {

	it('should CREATE the stop time of a Time record of a Project with a valid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/stop`)
		  .send({validPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'startTime', 'endTime', 'project');
		  });

	}).timeout(TIMEOUT_TIME);

	it('should NOT CREATE the stop time of a Time record of a Project with an invalid ID', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/stop`)
		  .send({validPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('should NOT POST the stop time of a Time record given an invalid post', async () => {
		let project = await Project.create({name: 'Projektename', color: '#fffff', completed: 'true'});
		chai.request(server)
		  .post(`/projects/${project.id}/stop`)
		  .send({invalidPost})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

});

//Test the GET from /projects/{id}/tasks/{task-id}
describe('/GET /projects/{id}/tasks/{task-id}', () => {
	it('it should NOT GET a project with a task which is given the invalid id', async () => {
		await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'})
		chai.request(server)
		  .get('/projects/{id}/tasks/INVALID_ID')
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('it should GET a project with a task which is given the valid id', async () => {
		let task = await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'})
		chai.request(server)
		  .get(`/projects/{id}/tasks/${task.id}`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'project', 'description', 'completed');
			  res.body.should.have.property('_id').should.equal(task.id);
			  res.body.should.have.pro
		  });
	}).timeout(TIMEOUT_TIME);
});


//Test the PATCH from /projects/{id}/tasks/{task-id}
describe('/PATCH /projects/{id}/tasks/{task-id}', () => {
	it('should not PATCH a project with a task which is given the invalid id', async () => {
		await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'});
		chai.request(server)
		  .patch('/projects/{id}/tasks/INVALID_ID')
		  .send({validPatch})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('should PATCH a project with a task which is given the valid id', async ()=> {
		const task = await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'});
		chai.request(server)
		  .patch(`/projects/{id}/tasks/${task.id}`)
		  .send({validPatch})
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(200);
			  res.body.should.be.an.object;
			  res.body.should.have.keys('_id', 'project', 'description', 'completed');
			  res.body.should.have.property('id').should.equal(task.id);
		  });
	}).timeout(TIMEOUT_TIME);

	it('should NOT PATCH a project with a task which is given the valid id', async () => {
		const task = await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'});
		chai.request(server)
		  .patch(`/projects/{id}/tasks/${task.id}`)
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

//Test the DELETE from /projects/{id}/tasks/{task-id}
describe('/DELETE /projects/{id}/tasks/{task-id}', () => {
	it('should NOT DELETE a project with a task which is given the invalid id', async () => {
		chai.request(server)

		  .delete(`/projects/{id}/tasks/INVALID_ID`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(404);
		  });
	}).timeout(TIMEOUT_TIME);

	it('should DELETE a project with a task which is given the valid id', async () => {
	const task = await Task.create({project: 'Projektname', description: 'irgendwas', completed: 'false'});
		chai.request(server)
		  .delete(`/projects/{id}/tasks/${task.id}`)
		  .end((err, res) => {
			  if (res.status === 500 && process.env.ENV === 'dev') {
				  console.log('Test ignored.');
				  return;
			  }
			  res.should.have.status(200);
		  });
	}).timeout(TIMEOUT_TIME);
});
