import { Schema, Types, model } from 'mongoose';
import IRecord from '../../model/Record';
import Project from './project';
import Task from './task';

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
      type: Types.ObjectId,
      ref: 'project',
      required: true,
    },
    task: {
      type: Types.ObjectId,
      ref: 'task',
      required: false,
    },
  },
);

RecordSchema.post('save', async (record: IRecord, next) => {
  // Create reference in task or project when created
  if (record.task) {
    await Task.findByIdAndUpdate(record.task, {$push: {records: new Types.ObjectId(record._id)}});
  }

  await Project.findByIdAndUpdate(record.project, {$push: {records: new Types.ObjectId(record._id)}});
  next();
});

RecordSchema.post('findOneAndRemove', async (removedRecord: IRecord) => {
  // Remove record from project or task too
  if (removedRecord.task) {
    console.log(await Task.findById(removedRecord.task));
    await Task.update(
      { _id: removedRecord.task as string },
      { $pull: { records: removedRecord._id } },
    );
  } else {
    await Project.update(
      { _id: removedRecord.project as string },
      { $pull: { records: removedRecord._id } },
    );
  }
});

export default model<IRecord>('record', RecordSchema);
