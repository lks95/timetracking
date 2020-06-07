import { Task } from '../models/task';

export const TASKS: Task[] = [
  { id: 21, description: 'First Task', project: 11},
  { id: 22, description: 'Second Task', project: 11},
  { id: 23, description: 'Third Task', project: 11},
  { id: 24, description: 'Fourth Task', project: 11},
  { id: 25, description: 'Fifth Task', project: 11, completed: true},
  { id: 26, description: 'Sixth Task', project: 11, completed: true},
  { id: 27, description: 'Seventh Task', project: 11},
  { id: 28, description: 'Eighth Task', project: 11, completed: true},

  { id: 31, description: 'First Task', project: 12, completed: true},
  { id: 32, description: 'Second Task', project: 12, completed: true},
  { id: 33, description: 'Third Task', project: 12},

  { id: 41, description: 'First Task', project: 13},
  { id: 42, description: 'Second Task', project: 13},
  { id: 43, description: 'Third Task', project: 13, completed: true},
  { id: 44, description: 'Fourth Task', project: 13},

  { id: 51, description: 'First Task', project: 14},

  { id: 61, description: 'First Task', project: 15},
  { id: 62, description: 'Second Task', project: 15, completed: true},
  { id: 63, description: 'Third Task', project: 15, completed: true},
  { id: 64, description: 'Fourth Task', project: 15},

  { id: 81, description: 'First Task', project: 17, completed: true},
  { id: 82, description: 'Second Task', project: 17, completed: true},

  { id: 91, description: 'First Task', project: 18, completed: true},
  { id: 92, description: 'Second Task', project: 18, completed: true},
  { id: 93, description: 'Third Task', project: 18, completed: true},
];
