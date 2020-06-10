import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {Project} from '../../models/project';
import {Record} from '../../models/record';
import {TaskService} from '../../services/task.service';
import {ProjectService} from '../../services/project.service';
import {RecordService} from '../../services/record.service';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild('playButton') playButton;
  @Output() taskEmitter: EventEmitter<Task> = new EventEmitter();

  currentProject?: Project;
  records: Record [];
  recordsOfProject = [];
  selectedTask: Task;
  playButtonPressed = false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private recordService: RecordService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.subscribeToObservables();
  }

  ngOnInit(): void {
    this.getProject();
  }

  subscribeToObservables() {
    this.projectService.onProjectSelection.subscribe(project => {
      this.currentProject = project;
    });
  }

  onSelect(task: Task): void {
    if (!this.playButtonPressed && this.selectedTask === task) {
      this.selectedTask = null;
      this.taskEmitter.emit(null);
    } else if (!this.playButtonPressed) {
      this.selectedTask = task;
      this.taskEmitter.emit(task);
    }
  }

  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => {
        this.projectService.selectProject(project);
      });
  }

  getTasksNotCompleted(): Task[] {
    const tasksNotCompleted = [];
    this.currentProject?.tasks?.forEach(task => {
      if (!task.completed) {
        tasksNotCompleted.push(task);
      }
    });
    return tasksNotCompleted;
  }

  getTasksCompleted(): Task[] {
    const tasksCompleted = [];
    this.currentProject?.tasks?.forEach(task => {
      if (task.completed) {
        tasksCompleted.push(task);
      }
    });
    return tasksCompleted;
  }

  getTasks(): Task[] {
    return this.currentProject.tasks as Task[];
  }

  getRecords(): Record[] {
    return this.currentProject.records as Record[];
  }

  openTaskCreationDialog(): void {
    // TODO
  }

  openRecordCreationDialog(): void {
    // TODO
  }
}
