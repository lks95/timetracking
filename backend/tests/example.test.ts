import { expect } from 'chai';
import 'mocha';
import Task from '../src/model/Task';

describe('OK', () => {
  it('should be OK', () => {
    const result = 'OK';
    expect(result).to.equal('OK');
  });

  it('should not be NOT OK', () => {
    const result = 'OK';
    expect(result).to.not.equal('NOT OK');
  });
});

describe('Task', () => {
  const task = new Task();
  it('should be an object', () => {
    expect(task).to.be.an('object');
  });
  it('should be by default not completed', () => {
    expect(task.isCompleted()).to.be.false;
  });
  it('should be by default not completed', () => {
    expect(task.getDescription()).to.be.empty;
  });
});
