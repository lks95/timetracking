import {Task} from './task';
import {Record} from './record';

export interface Project {
  _id: string;
  name: string;
  color: string;
  completed?: boolean;
  tasks?: string[] | Task[];
  records?: string[] | Record[];
}
