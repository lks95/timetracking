import { Schema, Document, model } from 'mongoose';
import { IProject, Project } from './project';
import { IRecord, Record } from './record';

export interface ITask extends Document {
  id: string;

  project: IProject;

  description: string;

  completed: boolean;

  readonly records: IRecord[];
}

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

export const Task = model<ITask>('task', TaskSchema);
