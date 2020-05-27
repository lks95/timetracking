import { Schema, Types, model } from 'mongoose';
import ITask from '../../model/Task';
import Project from './project';

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    project: {
      type: Types.ObjectId,
      ref: 'project',
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
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

TaskSchema.pre('save', (next) => {
  // TODO Validate task before saving
  next();
});

TaskSchema.post('save', async (task: ITask) => {
  await Project.findByIdAndUpdate(task.project, { $push: { tasks: new Types.ObjectId(task._id) } });
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
