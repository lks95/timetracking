import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {Project} from '../../models/project';
import {Record} from '../../models/record';
import {TaskService} from '../../services/task.service';
import {ProjectService} from '../../services/project.service';
import {RecordService} from '../../services/record.service';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskDialog} from '../dialogs/create-task/create-task.dialog';
import {CreateRecordDialog} from '../dialogs/create-record/create-record.dialog';

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
    private dialog: MatDialog,
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

    this.taskService.onTaskCreation.subscribe(task => {
      (this.currentProject.tasks as Task[]).push(task);
    });

    this.recordService.onRecordCreation.subscribe(record => {
      console.log('Subscription of record creation triggered.');
      (this.currentProject.records as Record[]).push(record);
    });

    this.recordService.onRecordChanged.subscribe(record => {
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

  getTasks(): Task[] {
    return this.currentProject?.tasks as Task[]
      ? (this.currentProject.tasks as Task[]).sort((t1, t2) => t1.description > t2.description ? 1 : -1)
      : [];
  }

  getRecords(): Record[] {
    if (this.currentProject?.records) {
      return (this.currentProject?.records as Record[])
        .sort((r1, r2) => new Date(r2.startTime).getTime() - new Date(r1.startTime).valueOf());
    }
    return [];
  }

  openTaskCreationDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialog, {
      minHeight: '128px',
      maxHeight: '100%',
      minWidth: '512px',
      maxWidth: '90%',
      data: this.currentProject
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedProject = result;
    });
  }

  openRecordCreationDialog(): void {
    const dialogRef = this.dialog.open(CreateRecordDialog, {
      minHeight: '128px',
      maxHeight: '100%',
      minWidth: '512px',
      maxWidth: '90%',
      data: {
        project: this.currentProject,
        task: this.selectedTask
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedProject = result;
    });
  }
}
