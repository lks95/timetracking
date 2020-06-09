import { Task } from '../models/task';

export const TASKS: Task[] = [
  { _id: '21', description: 'First Task', project: '11'},
  { _id: '22', description: 'Second Task', project: '11'},
  { _id: '23', description: 'Third Task', project: '11'},
  { _id: '24', description: 'Fourth Task', project: '11'},
  { _id: '25', description: 'Fifth Task', project: '11', completed: true},
  { _id: '26', description: 'Sixth Task', project: '11', completed: true},
  { _id: '27', description: 'Seventh Task', project: '11'},
  { _id: '28', description: 'Eighth Task', project: '11', completed: true},

  { _id: '31', description: 'First Task', project: '12', completed: true},
  { _id: '32', description: 'Second Task', project: '12', completed: true},
  { _id: '33', description: 'Third Task', project: '12'},

  { _id: '41', description: 'First Task', project: '13'},
  { _id: '42', description: 'Second Task', project: '13'},
  { _id: '43', description: 'Third Task', project: '13', completed: true},
  { _id: '44', description: 'Fourth Task', project: '13'},

  { _id: '51', description: 'First Task', project: '14'},

  { _id: '61', description: 'First Task', project: '15'},
  { _id: '62', description: 'Second Task', project: '15', completed: true},
  { _id: '63', description: 'Third Task', project: '15', completed: true},
  { _id: '64', description: 'Fourth Task', project: '15'},

  { _id: '81', description: 'First Task', project: '17', completed: true},
  { _id: '82', description: 'Second Task', project: '17', completed: true},

  { _id: '91', description: 'First Task', project: '18', completed: true},
  { _id: '92', description: 'Second Task', project: '18', completed: true},
  { _id: '93', description: 'Third Task', project: '18', completed: true},
];
