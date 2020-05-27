import * as express from 'express';
import Project from '../db/schemas/project';
import Task from '../db/schemas/task';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('tasks', '_id description completed')
      .populate('records', '_id startTime endTime');

    if (!project) {
      res.status(404).send('Project not found');
      return;
    }

    res.status(200).send(project);
  } catch (err) {
    res.status(400).send('Invalid project id');
  }
});

router.patch('/:id', async (req, res) => {
  let error;
  let project;

  if (!req.body.name && !req.body.color && !req.body.completed) {
    res.status(400).send('Request body invalid');
    return;
  }

  try {
    project = await Project.findById(req.params.id, '_id name color completed');
  } catch (err) {
    error = err;
    res.status(400).send('Invalid project id');
  }

  if (error) return;

  if (!project) {
    res.status(404).send('Project not found');
  }

  project.name = req.body.name ? req.body.name : project.name;
  project.color = req.body.color ? req.body.color : project.color;
  project.completed = req.body.completed ? req.body.completed : project.completed;

  const updated = await project.save();
  res.status(200).send(updated);
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.id);

    if (!project) {
      res.status(404).send('Project not found.');
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).send('Invalid project id');
  }
});

router.get('/:id/tasks', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).send('Project not found');
      return;
    }

    const tasks = await Task.find({ project: req.params.id }).populate('records');
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send('Invalid project id');
  }
});

router.post('/:id/tasks', async (req, res) => {
  const { id } = req.params;
  let project;

  try {
    project = await Project.findById(id);
  } catch (err) {
    res.status(404).send('Invalid project id');
    return;
  }

  if (!project) {
    res.status(404).send('Project not found');
    return;
  }

  if (project.completed) {
    res.status(400).send('You cannot create a task for a completed project');
    return;
  }

  if (!req.body.description) {
    res.status(400).send('Invalid request body');
    return;
  }

  try {
    const task = await Task.create({ description: req.body.description, project: project._id });
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send('Internal server error');
    console.error(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}, 'name color completed');
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send('Internal server error');
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  if (!req.body.name) {
    res.status(400).send('Invalid request body');
    return;
  }

  const existingProject = await Project.findOne({ name: req.body.name });

  if (existingProject) {
    res.status(400).send('Project with this name already exists.');
  }

  // TODO Auto generate the color instead of using default white color
  const projectColor = req.body.color || '#ffffff';
  try {
    const project = await Project.create({ name: req.body.name, color: projectColor });
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send('Internal server error');
    console.error(err);
  }
});

module.exports = router;
