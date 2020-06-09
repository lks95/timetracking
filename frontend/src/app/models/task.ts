export interface Task {
  _id: string;
  description: string;
  completed?: boolean;
  project?: string;
  records?: string[];
}
