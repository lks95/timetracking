import { Project } from '../models/project';

export const PROJECTS: Project[] = [
  { id: 11, name: 'First Project', color: '#ed2b4f', completed: false, tasks: [21,22,23,24,25,26,27,28] },
  { id: 12, name: 'Second Project', color: '#eda92b', completed: true},
  { id: 13, name: 'Third Project', color: '#e0dc5a', completed: false },
  { id: 14, name: 'Fourth Project', color: '#87c944', completed: false },
  { id: 15, name: 'Fifth Project', color: '#e05aaf', completed: false },
  { id: 16, name: 'Sixth Project', color: '#5aa4e0', completed: false },
  { id: 17, name: 'Seventh Project', color: '#aa44c9', completed: true },
  { id: 18, name: 'Eighth Project', color: '#6354c7', completed: true }
];
