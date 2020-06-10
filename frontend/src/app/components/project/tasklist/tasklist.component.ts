import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/task';
import {Project} from '../../../models/project';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  @Input() tasks: Task[];
  currentProject: Project;
  selectedTask: Task;

  constructor() {
  }

  ngOnInit(): void {
  }

  openTaskCreationDialog(): void {
    // TODO Implement me
  }

  getIncompleteTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  getCompleteTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  onSelect(task: Task): void {
    // TODO Handle task selection
  }
}
