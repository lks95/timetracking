import { expect } from 'chai';
import * as chai from 'chai';
import 'mocha';
import Project from '../src/model/Project';

const server = require('../src/index');

import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const TIMEOUT_TIME = 2000;
