export interface Record {
  id: number;
  startTime: Date;
  endTime?: Date;
  project: number;
  task?: number;
}
