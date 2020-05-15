import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as logger from 'morgan';
import * as YAML from 'yamljs';

const apiDoc = YAML.load('./docs/api/v1/definition.yml');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const recordsRouter = require('./routes/records');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false,
    }));

    this.app.use('/projects', projectsRouter);
    this.app.use('/tasks', tasksRouter);
    this.app.use('/records', recordsRouter);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
  }
}

export default new App().app;
