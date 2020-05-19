import { Schema, model } from 'mongoose';
import IRecord from '../../model/Record';

const RecordSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: false,
      default: Date.now,
    },
    endTime: {
      type: Date,
      required: false,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'task',
      required: false,
    },
  },
);

RecordSchema.pre('save', (next) => {
  // TODO Validate record before saving
  next();
});

RecordSchema.pre('updateOne', (next) => {
  // TODO Validate record before update
  next();
});

RecordSchema.pre('remove', (next) => {
  // TODO Validate record before removal
  next();
});

// TODO Add further middleware if necessary

export default model<IRecord>('record', RecordSchema);
