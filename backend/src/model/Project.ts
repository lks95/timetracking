import { Document, Types } from 'mongoose';


export default interface IProject extends Document {
  _id: string;
  name: string;
  color: string;
  completed: boolean;
  tasks: Types.ObjectId[];
  records: Types.ObjectId[];
}
