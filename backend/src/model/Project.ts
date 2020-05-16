import { Document } from 'mongoose';
import ITask from './Task';
import IRecord from './Record';

export default interface IProject extends Document {
  id?: string;
  name: string;
  color: string;
  completed: boolean;
  tasks: ITask[];
  records: IRecord[];
}
