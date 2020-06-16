import * as express from 'express';
import Project from '../db/schemas/project';
import Task from '../db/schemas/task';
import Record from '../db/schemas/record';

const router = express.Router();

router.get('/running', async (req, res) => {
  const runningRecords = await Record.find({endTime: {$exists: false}});
  return res.status(200).json(runningRecords);
});

router.post('/start', async (req, res) => {
  if ((!req.body.project && !req.body.task) || (req.body.project && req.body.task)) {
    res.status(400).send('Request body invalid. Please provide exactly one id.');
    return;
  }

  try {
    let parent;

    if (req.body.project) {
      parent = await Project.findById(req.body.project);
    } else {
      parent = await Task.findById(req.body.task);
    }

    const runningRecord = await Record.findOne({
      project: parent.project || parent._id,
      task: req.body.task,
      endTime: {$exists: false},
    });

    if (runningRecord) {
      res.status(400).send('You are not allowed to start a new record while there is ' +
        'a record ongoing for this task or project');
      return;
    }

    const record = await Record.create({
      project: parent.project || parent._id,
      task: req.body.task,
    });
    res.status(200).json(record);
  } catch (error) {
    res.status(404).send('Id does not exist.');
  }
});

router.post('/stopAll', async (req, res) => {
  const runningRecords = await Record.find({endTime: {$exists: false}});
  const ids = runningRecords.map(record => record._id);

  await Record.updateMany({endTime: {$exists: false}}, {endTime: Date.now()});

  const stoppedRecords = await Record.find({_id: {$in: ids}});

  res.status(200).json(stoppedRecords);
});

router.post('/:id/stop', async (req, res) => {
  try {
    const updated = await Record.findOneAndUpdate({
      _id: req.params.id,
      endTime: {$exists: false}
    }, {$set: {endTime: Date.now()}}, {new: true});
    console.log(updated);

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).send('Record not found or already stopped.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    res.status(404).send('Record not found');
  }
});

router.patch('/:id', async (req, res) => {
  if (!req.body.startTime && !req.body.endTime) {
    res.status(400).send('Invalid request body');
    return;
  }

  try {
    const record = await Record.findById(req.params.id);

    const start = req.body.startTime || record.startTime;
    const end = req.body.endTime || record.endTime;

    if (start > end) {
      res.status(400).send('Start time cannot be before end time');
      return;
    }

    record.startTime = start;
    record.endTime = end;

    const updated = await Record.findOneAndUpdate({
      _id: req.params.id,
    }, { $set: { startTime: start, endTime: end } }, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).send('Record not found');
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  if ((!req.body.project && !req.body.task) || (req.body.project && req.body.task)) {
    res.status(400).send('Request body invalid. Please provide exactly one id of project or task.');
    return;
  }

  if ((!req.body.startTime || !req.body.endTime)) {
    res.status(400).send('Request body invalid. Please provide both start and end date-times');
    return;
  }

  try {
    let parent;

    if (req.body.project) {
      parent = await Project.findById(req.body.project);
    } else {
      parent = await Task.findById(req.body.task);
    }

    const record = await Record.create({
      project: parent.project || parent._id,
      task: req.body.task,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(400).send('There was a problem while creating the record. ' +
      'Please check the format of start and end time again.');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Record.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).send('Record not found');
  }
});

module.exports = router;
