import { Document, Types } from 'mongoose';
import ITask from './Task';
import IRecord from './Record';


export default interface IProject extends Document {
  _id: string;
  name: string;
  color: string;
  completed: boolean;
  tasks: Types.ObjectId[] | ITask[];
  records: Types.ObjectId[] | IRecord[];
}
