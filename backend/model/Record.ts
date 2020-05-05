import Task from './Task';
import Project from './Project';

export default class Record {
  private id?: string;

  private startTime: Date;

  private endTime?: Date;

  private task?: Task;

  private project: Project;

  constructor(project: Project, startTime: Date) {
    this.project = project;
    this.startTime = startTime;
  }

  public getId(): string {
    return this.id;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public setStartTime(value: Date) {
    this.startTime = value;
  }

  public getEndTime(): Date {
    return this.endTime;
  }

  public setEndTime(value: Date) {
    this.endTime = value;
  }
}
