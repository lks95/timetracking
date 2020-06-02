export interface Project {
  id: number;
  name: string;
  color: string;
  completed?: boolean;
  tasks?: number[];
  records?: number[];
}
