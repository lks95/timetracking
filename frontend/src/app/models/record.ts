export interface Record {
  id: string;
  startTime: Date;
  endTime?: Date;
  project: string;
  task?: string;
}
