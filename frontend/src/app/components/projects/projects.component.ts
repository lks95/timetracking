import {Component, OnInit, ViewChild} from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('playButton') playButton;

  projects: Project[];
  selectedProject: Project;
  playButtonPressed = false;
  recordDisplay = '00:00:23';

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    if (!this.playButtonPressed && this.selectedProject === project) {
      this.selectedProject = null;
    } else if (!this.playButtonPressed) {
      this.selectedProject = project;
    }
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getProjectsNotCompleted(): Project[] {
    const projectsNotCompleted = [];
    this.projects.forEach((project) => {
      if (!project.completed) {
        projectsNotCompleted.push(project);
      }
    });
    return projectsNotCompleted;
  }

  getProjectsCompleted(): Project[] {
    const projectsCompleted = [];
    this.projects.forEach((project) => {
      if (project.completed === true) {
        projectsCompleted.push(project);
      }
    });
    return projectsCompleted;
  }

  play(){
    //TODO: Record starten oder stoppen
    if (!this.playButtonPressed && !this.playButton.disabled){
      this.playButtonPressed = true;
    } else if (this.playButtonPressed) {
      this.playButtonPressed = false;
      this.selectedProject = null;
    }
  }

  openProjectCreationDialog(): void {
    // TODO
  }

  setCompletion(): void {
    if(this.selectedProject.completed){
      this.setProjectNotCompleted();
    } else {
      this.setProjectCompleted()
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

}
