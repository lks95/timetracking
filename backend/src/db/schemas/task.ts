import { Schema, Types, model } from 'mongoose';
import ITask from '../../model/Task';
import Project from './project';
import Record from './record';

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

TaskSchema.post('save', async (task: ITask) => {
  await Project.findByIdAndUpdate(task.project, { $push: { tasks: new Types.ObjectId(task._id) } });
});

TaskSchema.post('findOneAndRemove', async (task: ITask) => {
  await Project.findByIdAndUpdate(task.project, { $pull: { tasks: new Types.ObjectId(task._id) } });
  await Record.remove({ task: task._id });
});

export default model<ITask>('task', TaskSchema);
