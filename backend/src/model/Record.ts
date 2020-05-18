import { Document } from 'mongoose';
import IProject from './Project';
import ITask from './Task';

export default interface IRecord extends Document {
  _id: string;
  startTime: Date;
  project: IProject;
  endTime?: Date;
  task?: ITask;
}
