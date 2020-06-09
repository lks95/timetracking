import {Task} from './task';

export interface Project {
  _id: string;
  name: string;
  color: string;
  completed?: boolean;
  tasks?: string[] | Task[];
  records?: string[] | Task[];
}
