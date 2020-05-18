import { Schema, model } from 'mongoose';
import Task from './task';
import Record from './record';
import IProject from '../../model/Project';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tasks: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
      }],
      default: [],
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

ProjectSchema.pre('save', (next) => {
  // TODO Validate project before saving
  next();
});

ProjectSchema.pre('updateOne', (next) => {
  // TODO Validate project before update
  next();
});

ProjectSchema.pre('remove', (next) => {
  // TODO Validate project before removal
  next();
});

// TODO Add further middleware if necessary

export default model<IProject>('project', ProjectSchema);