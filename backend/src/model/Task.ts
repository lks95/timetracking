import { Document, Types } from 'mongoose';
import IRecord from './Record';
import IProject from './Project';

export default interface ITask extends Document {
  _id: string;
  project: Types.ObjectId | IProject;
  description: string;
  completed: boolean;
  records: Types.ObjectId[] | IRecord[];
}
