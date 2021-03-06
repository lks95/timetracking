import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CreateProjectDialog} from './components/dialogs/create-project/create-project.dialog';
import {EditProjectDialog} from './components/dialogs/edit-project/edit-project.dialog';
import {Project} from './models/project';
import {Task} from './models/task';
import {Record} from './models/record';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectService} from './services/project.service';
import {TaskService} from './services/task.service';
import {RecordService} from './services/record.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('playButton') playButton;

  title = 'frontend';
  selectedProject: Project = null;
  selectedTask: Task = null;
  runningRecord: Record;
  componentRef: any;
  currentTime: number;
  recordTime: number;
  timeDifference: number;


  private projectSelectionSub: Subscription;
  private projectDeletionSub: Subscription;
  private taskSelectionSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private recordService: RecordService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToObservables();
    setInterval(() => {
      if (this.runningRecord) {
        this.currentTime = new Date().getTime();
        this.timeDifference = this.currentTime - this.recordTime;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  subscribeToObservables() {
    this.projectSelectionSub = this.projectService.onProjectSelection.subscribe(project => {
      this.selectedProject = project;
    });
    this.projectDeletionSub = this.projectService.onProjectDeleted.subscribe(deletedProject => {
      this.projectService.selectProject(null);
      this.taskService.selectTask(null);
      if (!this.isInstanceOfProjects()) {
        this.router.navigate(['../']);
      }
    });
    this.taskSelectionSub = this.taskService.onTaskSelection.subscribe(task => {
      this.selectedTask = task;
    });
  }

  unsubscribe() {
    this.projectSelectionSub.unsubscribe();
    this.taskSelectionSub.unsubscribe();
  }

  play() {
    if (this.runningRecord != null) {
      this.recordService.stopRecord(this.runningRecord).subscribe(finalRecord => {
        this.runningRecord = null;
        this.recordTime = null;
      });
    } else if (this.selectedTask != null) {
      this.recordService.startTaskRecording(this.selectedTask).subscribe(record => {
        this.runningRecord = record;
        this.recordTime = new Date(record.startTime).getTime();
      });
    } else if (this.selectedProject != null) {
      this.recordService.startProjectRecording(this.selectedProject).subscribe(record => {
        this.runningRecord = record;
        this.recordTime = new Date(record.startTime).getTime();
      });
    }
  }

  onActivate(componentReference) {
    console.log('on Activate called.');
    this.componentRef = componentReference;
  }

  onElementAction(): void {
    if (this.isInstanceOfProjects()) {
      const dialogRef = this.dialog.open(CreateProjectDialog, {
        minHeight: '256px',
        maxHeight: '70%',
        minWidth: '320px',
        width: '512px',
        maxWidth: '90%'
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.selectedProject = result;
      });
    } else {
      const dialogRef = this.dialog.open(EditProjectDialog, {
        minHeight: '256px',
        maxHeight: '70%',
        minWidth: '320px',
        width: '512px',
        maxWidth: '90%',
        data: this.selectedProject
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.selectedProject = result;
      });
    }
  }

  setCompletion(project: Project, completed: boolean): void {
    this.projectService.setCompletionProject(project, completed);
  }

  public onBackPressed(): void {
    this.router.navigate(['../']);
    // Remove task selection on projects overview
    if (!this.runningRecord || this.runningRecord.task !== this.selectedTask._id) {
      this.taskService.selectTask(null);
    }
  }

  isInstanceOfProjects(): boolean {
    return this.componentRef instanceof ProjectsComponent;
  }

  getTimeDifference(): void {
    console.log(new Date());
    console.log(new Date(this.runningRecord.startTime));
  }
}
