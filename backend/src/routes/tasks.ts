import * as express from 'express';
import Task from '../db/schemas/task';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('records', '_id startTime endTime');

    if (!task) {
      res.status(404).send('Task not found');
      return;
    }

    res.status(200).send(task);
  } catch (err) {
    res.status(400).send('Invalid task id');
  }
});

router.patch('/:id', async (req, res) => {
  let error;
  let task;

  if (!req.body.description && req.body.completed === undefined) {
    res.status(400).send('Request body invalid');
    return;
  }

  try {
    task = await Task.findById(req.params.id, '_id description completed');
  } catch (err) {
    error = err;
    res.status(400).send('Invalid task id');
  }

  if (error) return;

  if (!task) {
    res.status(404).send('Task not found');
  }

  const desc = req.body.description ? req.body.description : task.description;
  const comp = req.body.completed !== undefined ? req.body.completed : task.completed;

  const updated = await Task.findOneAndUpdate({
    _id: req.params.id,
  }, { $set: { description: desc, completed: comp } }, { new: true });

  res.status(200).send(updated);
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);

    res.status(204).send();
  } catch (err) {
    res.status(404).send('Task not found.');
  }
});

module.exports = router;
