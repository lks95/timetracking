export interface Task {
  id: string;
  description: string;
  completed?: boolean;
  project?: string;
  records?: string[];
}
