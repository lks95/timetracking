import { Schema, Types, model } from 'mongoose';
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
        type: Types.ObjectId,
        ref: 'task',
      }],
      default: [],
    },
    records: {
      type: [{
        type: Types.ObjectId,
        ref: 'record',
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
