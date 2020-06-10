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

    this.recordService.onRecordCreation.subscribe(record => {
      console.log('Subscription of record creation triggered.');
      (this.currentProject.records as Record[]).push(record);
    });

    this.recordService.onRecordCompletion.subscribe(record => {
      console.log(record);
      const index = (this.currentProject.records as Record[]).findIndex(r => r._id === record._id);
      (this.currentProject.records as Record[])[index] = record;
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
    return (this.currentProject.records as Record[])
      .sort((r1, r2) => new Date(r2.startTime).getTime() - new Date(r1.startTime).valueOf());
  }

  openTaskCreationDialog(): void {
    // TODO
  }

  openRecordCreationDialog(): void {
    // TODO
  }
}
