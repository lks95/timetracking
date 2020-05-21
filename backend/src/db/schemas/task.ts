import { Schema, Document, model } from 'mongoose';
import ITask from '../../model/Task';

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    records: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'record',
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
