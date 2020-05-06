import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as logger from 'morgan';
import * as YAML from 'yamljs';

const apiDoc = YAML.load('./docs/api/v1/definition.yml');

class App {
  // TODO Import routers like below
  // const indexRouter = require('./routes/index');
  // const usersRouter = require('./routes/users');

  public app: express;

  constructor() {
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false,
    }));

    // TODO Update routers
    // app.use('/', indexRouter);
    // app.use('/users', usersRouter);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
  }
}

export default new App().app;
