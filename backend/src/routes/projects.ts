import * as express from 'express';
import Project from '../db/schemas/project';
import Task from '../db/schemas/task';
import Record from '../db/schemas/record';

const router = express.Router();

router.get('/:id', async (req, res) => {
  // let project;
  let projectTasksAndRecords;
  try {
    // project = await Project.findById(req.params.id);
    projectTasksAndRecords = await Project.findById(req.params.id).populate('tasks').populate('records');
    res.status(200).send(projectTasksAndRecords);
  } catch (err) {
    res.status(404).send('Project id invalid.');
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findById(id);
  } catch (err) {
    res.status(404).send('Project id invalid.');
    return;
  }

  if (req.body.name.equals('')) {
    res.status(400).send('Project name was not specified.');
    return;
  }

  let update;
  const options = { new: true };
  if (req.body.color.equals('')) {
    update = { name: req.body.name };
  } else {
    update = { name: req.body.name, color: req.body.color };
  }
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, update, options);
    res.status(200).send(updatedProject);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    await Task.deleteMany({ project: id });
    await Record.deleteMany({ project: id });
    res.status(204).send('Project and all related tasks and records were successfully removed.');
  } catch (err) {
    res.status(404).send('Project was not found.');
  }
});

router.get('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findById(id);
  } catch (err) {
    res.status(404).send('Project id invalid.');
    return;
  }
  try {
    const tasks = await Task.find({ project: id }).populate('records');
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
  }
});

router.post('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  let project;
  try {
    project = await Project.findById(id);
  } catch (err) {
    res.status(404).send('Project id invalid.');
    return;
  }
  if (req.body.description == null) {
    res.status(400).send('Request body was invalid.');
    return;
  }
  try {
    const task = await Task.create({ description: req.body.description });
    project.tasks.push(task._id);
    await project.save();
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const args = 'name color completed';
  try {
    const projects = await Project.find({}, args);
    res.status(200).send(projects);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  if (req.body.name.equals('')) {
    res.status(400).send('Request Body was invalid.');
    return;
  }
  let projectcolor;
  if (req.body.color.equals('')) {
    projectcolor = '#ffffff';
  } else {
    projectcolor = req.body.color;
  }
  try {
    const project = await Project.create({ name: req.body.name, color: projectcolor });
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
