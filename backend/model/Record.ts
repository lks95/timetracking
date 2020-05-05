import Task from './Task';
import Project from './Project';

export default class Record {
  private id: string;

  private startTime: Date;

  private endTime: Date;

  private task: Task;

  private project: Project;
}
