import * as express from 'express';
import * as createError from 'http-errors';
import * as logger from 'morgan';


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
  }
}

export default new App().app;
