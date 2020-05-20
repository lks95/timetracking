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
