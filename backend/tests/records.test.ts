import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/model/Project';
import Task from '../src/model/Task';
import Record from '../src/model/Record';

const server = require('../src/server');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const TIMEOUT_TIME = 2000;
