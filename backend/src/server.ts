import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as logger from 'morgan';
import * as YAML from 'yamljs';
import * as mongoose from 'mongoose';
import { AddressInfo } from 'net';
import { Server } from 'http';

const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const recordsRouter = require('./routes/records');

require('dotenv').config();

// Load YAML file for swagger documentation
const apiDoc = YAML.load('./docs/api/v1/definition.yml');

// Initialize express app
const app: express.Application = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

// List of routers

app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/records', recordsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
// TODO Add further routes here

// Connect to database and handle errors
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, dbName: process.env.DATABASE_NAME || 'test', useFindAndModify: false })
  .catch((reason) => {
    switch (reason.name) {
      case 'MongoNetworkError':
        console.error('Could not establish connection with the database.');
        break;
      default:
        console.log(reason.name);
        console.error(reason);
    }
  });

mongoose.connection.once('open', () => {
  // If database connection established start server
  console.log('Connected to database.');
});

const server = app.listen(process.env.PORT || 3000, () => {
  if (typeof server.address() !== 'string') {
    const { address, port } = server.address() as AddressInfo;
    console.log(`Server running on ${address}:${port}`);
  }
});

module.exports = server;
