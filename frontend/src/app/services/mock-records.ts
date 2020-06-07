import { Record } from '../models/record';

export const RECORDS: Record[] = [
  { id: 101, startTime: new Date(2020,5,5,12,2,24),
    endTime: new Date(2020,5,5,12,51,47), project: 11 },
  { id: 102, startTime: new Date(2020,5,8,16,12,32),
    endTime: new Date(2020,5,8,17,5,12), project: 11 },
  { id: 103, startTime: new Date(2020,5,9,9,47,12),
    endTime: new Date(2020,5,9,9,54,43), project: 11 },
  { id: 104, startTime: new Date(2020,6,1,10,2,24),
    endTime: new Date(2020,6,1,10,47, 12), project: 12 },
  { id: 105, startTime: new Date(2020,5,5,12,2,24),
    endTime: new Date(2020,5,5,12,51,47), project: 11, task: 21 },
  { id: 106, startTime: new Date(2020,5,5,17,12,55),
    endTime: new Date(2020,5,5,17,55,31), project: 11, task: 22 }
];
