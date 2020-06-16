import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../../models/task';
import {Project} from '../../../models/project';
import {TaskService} from '../../../services/task.service';
import {ProjectService} from '../../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialog} from '../../dialogs/edit-task/edit-task.dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit, OnDestroy {

  @Input() tasks: Task[];
  currentProject: Project;
  selectedTask: Task;

  private projectSelectionSub: Subscription;
  private taskSelectionSub: Subscription;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscribeToObservables();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  subscribeToObservables(): void {
    this.projectSelectionSub = this.projectService.onProjectSelection.subscribe(project => {
      this.currentProject = project;
    });

    this.taskSelectionSub = this.taskService.onTaskSelection.subscribe(task => {
      this.selectedTask = task;
    });
  }

  private unsubscribe() {
    this.projectSelectionSub.unsubscribe();
    this.taskSelectionSub.unsubscribe();
  }

  getIncompleteTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  getCompleteTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  onSelect(task: Task): void {
    if (this.selectedTask?._id === task?._id) {
      this.taskService.selectTask(null);
    } else {
      this.taskService.selectTask(task);
    }
  }

  openEditTaskDialog(task: Task, event: any): void {
    const dialogRef = this.dialog.open(EditTaskDialog, {
      minHeight: '128px',
      maxHeight: '70%',
      minWidth: '320px',
      width: '512px',
      maxWidth: '90%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO Implement me
    });
    event.stopPropagation();
  }

  setTaskCompleted(task: Task, completed: boolean, event: any) {
    this.taskService.setTaskCompletion(task, completed);
    event.stopPropagation();
  }
}
