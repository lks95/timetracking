import Project from './Project';
import Record from './Record';

export default class Task {
  private id: string;

  private project: Project;

  private description: string;

  private completed: boolean;

  private readonly records: Record[];

  public getId(): string {
    return this.id;
  }

  public getProject(): Project {
    return this.project;
  }

  public setProject(value: Project) {
    this.project = value;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(value: string) {
    this.description = value;
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public setCompleted(value: boolean) {
    this.completed = value;
  }

  public getRecords(): Record[] {
    return this.records;
  }
}
