import { Document } from 'mongoose';
import IProject from './Project';
import IRecord from './Record';

export default interface ITask extends Document {
  _id: string;
  project: IProject;
  description: string;
  completed: boolean;
  readonly records: IRecord[];
}
