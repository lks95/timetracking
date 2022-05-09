import { Document, Types } from 'mongoose';


export default interface IRecord extends Document {
  _id: string;
  startTime: Date;
  project: Types.ObjectId;
  endTime?: Date;
  task?: Types.ObjectId;
}
