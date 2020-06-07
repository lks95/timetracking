import {Component, ViewChild} from '@angular/core';
import {CreateProjectDialog} from './components/dialogs/create-project/create-project.dialog';
import {Project} from './models/project';
import {Task} from './models/task';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('playButton') playButton;

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) {}

  playButtonPressed = false;
  title = 'frontend';
  selectedProject: Project = null;
  selectedTask: Task = null;
  recordDisplay = '00:00:23';

  play() {
    // TODO: Record starten oder stoppen
    if (!this.playButtonPressed && !this.playButton.disabled) {
      this.playButtonPressed = true;
    } else if (this.playButtonPressed) {
      this.playButtonPressed = false;
      this.selectedProject = null;
    }
  }

  onActivate(componentReference) {
    console.log(componentReference);
    componentReference.selectedProject = this.selectedProject;
    if (componentReference.projectEmitter) {
      componentReference.projectEmitter.subscribe((project) => {
        // TODO Handle project selection from projects component
        this.selectedProject = project;
      });
    }
    if (componentReference.taskEmitter) {
      componentReference.taskEmitter.subscribe((task) => {
        // TODO Handle task selection from tasks component
        this.selectedTask = task;
      });
    }
  }

  openProjectCreationDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      minHeight: '256px',
      maxHeight: '100%',
      minWidth: '512px',
      maxWidth: '100%',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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
}
