import { Document, Types } from 'mongoose';
import IProject from './Project';
import ITask from './Task';


export default interface IRecord extends Document {
  _id: string;
  startTime: Date | number;
  project: string | Types.ObjectId | IProject;
  endTime?: Date | number;
  task?: string | Types.ObjectId | ITask;
}
