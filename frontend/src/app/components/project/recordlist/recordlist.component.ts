import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Record} from '../../../models/record';
import {RecordService} from '../../../services/record.service';
import {MatDialog} from '@angular/material/dialog';
import {EditRecordDialog} from '../../dialogs/edit-record/edit-record.dialog';
import {Project} from '../../../models/project';
import {Task} from '../../../models/task';
import {ProjectService} from '../../../services/project.service';
import {Subscription} from 'rxjs';
import {TaskService} from '../../../services/task.service';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.scss']
})
export class RecordlistComponent implements OnInit, OnDestroy {

  currentProject: Project;
  selectedTask: Task;
  @Input() records: Record[] = [];

  projectSelectionSub: Subscription;
  taskSelectionSub: Subscription;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private recordService: RecordService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscribeToObservables();
  }

  ngOnDestroy() {
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

  unsubscribe(): void {
    this.projectSelectionSub.unsubscribe();
    this.taskSelectionSub.unsubscribe();
  }

  openEditRecordDialog(record: Record): void {
    const dialogRef = this.dialog.open(EditRecordDialog, {
      minHeight: '128px',
      maxHeight: '100%',
      minWidth: '512px',
      maxWidth: '90%',
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedProject = result;
    });
  }

  getTaskDescription(record: Record): string {
    const task = (this.currentProject?.tasks as Task[]).filter(t => t._id === record.task);
    return task[0]?.description;
  }
}
