import {Component, ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('playButton') playButton;

  playButtonPressed = false;
  title = 'frontend';
  selectedProject: Project = null;
  selectedTask: Task = null;
  recordDisplay = '00:00:23';
  runningRecord: Record;
  componentRef: any;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private recordService: RecordService
  ) {
    console.log('Constructor called');
    this.subscribeToObservables();
  }

  subscribeToObservables() {
    this.projectService.onProjectSelection.subscribe(project => {
      this.selectedProject = project;
    });
    // this.taskService.onTaskSelection.subscribe(task => {
    //   this.selectedTask = task;
    // });
  }

  play() {
    if (this.runningRecord != null) {
      this.recordService.stopRecord(this.runningRecord).subscribe(finalRecord => {
        this.runningRecord = null;
      });
    } else if (this.selectedTask != null) {
      this.recordService.startTaskRecording(this.selectedTask).subscribe(record => {
        this.runningRecord = record;
      });
    } else if (this.selectedProject != null) {
      this.recordService.startProjectRecording(this.selectedProject).subscribe(record => {
        this.runningRecord = record;
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
        maxHeight: '100%',
        minWidth: '512px',
        maxWidth: '90%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // TODO See if the result can be used somehow
        // this.animal = result;
      });
    } else {
      const dialogRef = this.dialog.open(EditProjectDialog, {
        minHeight: '256px',
        maxHeight: '100%',
        minWidth: '512px',
        maxWidth: '90%',
        data: this.selectedProject
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.selectedProject = result;
      });
    }
  }

  setCompletion(): void {
    if (this.selectedProject.completed) {
      this.setProjectNotCompleted();
    } else {
      this.setProjectCompleted();
    }
  }

  setProjectCompleted(): void {
    this.selectedProject.completed = true;
    // TODO
  }

  setProjectNotCompleted(): void {
    this.selectedProject.completed = false;
    // TODO
  }

  public onTaskSelection(task: Task): void {
    // TODO Implmement me
  }

  public onBackPressed(): void {
    // TODO Implement me
    this.router.navigate(['../']);
    // TODO Remove project selection / task selection whenever necessary
  }

  isInstanceOfProjects(): boolean {
    return this.componentRef instanceof ProjectsComponent;
  }
}
