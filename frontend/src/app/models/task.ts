export interface Task {
  id: number;
  description: string;
  completed?: boolean;
  project: number
  records?: number[];
}
