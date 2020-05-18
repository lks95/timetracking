import { Schema, Document, model } from 'mongoose';
import Project from './project';
import Record from './record';
import ITask from '../../model/Task';

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: Project,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    records: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Record',
      }],
      default: [],
    },
  },
);

TaskSchema.pre('save', (next) => {
  // TODO Validate task before saving
  next();
});

TaskSchema.pre('updateOne', (next) => {
  // TODO Validate task before update
  next();
});

TaskSchema.pre('remove', (next) => {
  // TODO Validate task before removal
  next();
});

// TODO Add further middleware if necessary

export default model<ITask>('task', TaskSchema);
