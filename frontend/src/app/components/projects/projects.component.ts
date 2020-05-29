import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  selectedProject: Project;
  symbolButton = '▶';
  enablePlayButton = false;
  playButtonPressed = false;
  recordDisplay = '00:00:23'
  displayDone = 'display';
  displayUndone = 'none';

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    if(!this.playButtonPressed) {
      if (this.selectedProject == project) {
        this.selectedProject = null;
        this.enablePlayButton = false;
      } else {
        this.selectedProject = project;
        if (!this.selectedProject.completed) {
          this.enablePlayButton = true;
          this.displayDone = 'display';
          this.displayUndone = 'none';
        } else {
          this.enablePlayButton = false;
          this.displayDone = 'none';
          this.displayUndone = 'display';
        }
      }
    }
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getProjectsNotCompleted(): Project[] {
    let projectsNotCompleted = new Array();
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].completed == false) {
        projectsNotCompleted.push(this.projects[i]);
      }
    }
    return projectsNotCompleted;
  }

  getProjectsCompleted(): Project[] {
    let projectsCompleted = new Array();
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].completed == true) {
        projectsCompleted.push(this.projects[i]);
      }
    }
    return projectsCompleted;
  }

  getBackgroundColor(project: Project): String {
    if (project === this.selectedProject) {
      return project.color;
    }
  }

  setBackgroundColorHeader(){
    if(this.selectedProject && !this.selectedProject.completed){
      return this.selectedProject.color;
    }
  }

  play(){
    if(!this.playButtonPressed && this.enablePlayButton && this.selectedProject){
      this.playButtonPressed = true;
      this.symbolButton = '■'
    } else if (this.playButtonPressed) {
      this.playButtonPressed = false;
      this.selectedProject = null;
      this.enablePlayButton = false;
      this.symbolButton = '▶'
    }
  }
}
