import * as express from 'express';

const router = express.Router();

router.get('/running', (req, res) => {
  // TODO Implement me
  res.status(500).send();
});

router.post('/start', (req, res) => {
  // TODO Implement me
  res.status(500).send();
});

router.post('/stopAll', (req, res) => {
  // TODO Implement me
  res.status(500).send();
});

router.post('/:id/stop', (req, res) => {
  // TODO Implement me
  res.status(500).send();
});

router.get('/:id', (req, res) => {
  // TODO Implement me
  res.status(500).send();
});

module.exports = router;
