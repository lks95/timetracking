export interface Record {
  _id: string;
  startTime: Date;
  endTime?: Date;
  project: string;
  task?: string;
}
