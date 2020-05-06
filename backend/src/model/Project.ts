import Task from './Task';
import Record from './Record';

export default class Project {
  private id?: string;

  private name: string;

  private color: string;

  private completed: boolean;

  private readonly tasks: Task[] = [];

  private readonly records: Record[] = [];

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.completed = false;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public getCompleted(): boolean {
    return this.completed;
  }

  public getRecords(): Record[] {
    return this.records;
  }

  public getTasks(): Task[] {
    return this.tasks;
  }
}
