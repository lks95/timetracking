import { Document, Schema, Types } from 'mongoose';

export default interface ITask extends Document {
  _id: string;
  project: Types.ObjectId;
  description: string;
  completed: boolean;
  readonly records: Types.ObjectId[];
}
