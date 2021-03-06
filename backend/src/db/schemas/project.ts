import { Schema, Types, model } from 'mongoose';
import IProject from '../../model/Project';
import Task from './task';
import Record from './record';

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

ProjectSchema.post('findOneAndRemove', async (project: IProject) => {
  await Task.remove({ project: project._id });
    await Record.remove({ project: project._id });
});

export default model<IProject>('project', ProjectSchema);
