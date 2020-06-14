import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../models/task';
import {Project} from '../../models/project';
import {Record} from '../../models/record';
import {TaskService} from '../../services/task.service';
import {ProjectService} from '../../services/project.service';
import {RecordService} from '../../services/record.service';

import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskDialog} from '../dialogs/create-task/create-task.dialog';
import {CreateRecordDialog} from '../dialogs/create-record/create-record.dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  @ViewChild('playButton') playButton;
  @Output() taskEmitter: EventEmitter<Task> = new EventEmitter();

  currentProject?: Project;
  selectedTask: Task;

  private projectSelectionSub: Subscription;
  private taskSelectionSub: Subscription;
  private taskCreationSub: Subscription;
  private recordCreationSub: Subscription;
  private taskUpdatedSub: Subscription;
  private recordChangedSub: Subscription;
  private recordDeletedSub: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private recordService: RecordService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.subscribeToObservables();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribeToObservables() {
    this.projectSelectionSub = this.projectService.onProjectSelection.subscribe(project => {
      this.currentProject = project;
    });

    this.taskSelectionSub = this.taskService.onTaskSelection.subscribe(task => {
      this.selectedTask = task;
    });

    this.taskCreationSub = this.taskService.onTaskCreation.subscribe(task => {
      console.log('onTaskCreation called.');
      (this.currentProject.tasks as Task[]).push(task);
    });

    this.recordCreationSub = this.recordService.onRecordCreation.subscribe(record => {
      console.log('Subscription of record creation triggered.');
      (this.currentProject.records as Record[]).push(record);
    });

    this.taskUpdatedSub = this.taskService.onTaskUpdated.subscribe(task => {
      const index = (this.currentProject.tasks as Task[]).findIndex(t => t._id === task._id);
      (this.currentProject.tasks as Task[])[index] = task;
    });

    this.recordChangedSub = this.recordService.onRecordChanged.subscribe(record => {
      console.log(record);
      const index = (this.currentProject.records as Record[]).findIndex(r => r._id === record._id);
      (this.currentProject.records as Record[])[index] = record;
    });

    this.recordDeletedSub = this.recordService.onRecordDeletion.subscribe(record => {
      console.log('Subscription of record creation triggered.');
      const index = (this.currentProject.records as Record[]).findIndex(r => r._id === record._id);
      (this.currentProject.records as Record[]).splice(index, 1);
    });
  }

  unsubscribe(): void {
    this.projectSelectionSub.unsubscribe();
    this.taskSelectionSub.unsubscribe();
    this.taskCreationSub.unsubscribe();
    this.recordCreationSub.unsubscribe();
    this.taskUpdatedSub.unsubscribe();
    this.recordChangedSub.unsubscribe();
    this.recordDeletedSub.unsubscribe();
  }

  getProject(): void {
    console.log('getProject called.');
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => {
        this.projectService.selectProject(project);
      });
  }

  getTasks(): Task[] {
    return this.currentProject?.tasks as Task[]
      ? (this.currentProject.tasks as Task[])
        .sort((t1, t2) => t1.description > t2.description ? 1 : t1.description < t2.description ? -1 : 0)
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

    // dialogRef.afterClosed().subscribe(result => {
    // });
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

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
}
