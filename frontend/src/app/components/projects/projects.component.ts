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
  symbolButton = '▶';
  // enablePlayButton = isPlayButtonEnabled();
  playButtonPressed = false;
  recordDisplay = '00:00:23';
  displayDone = 'display';
  displayUndone = 'none';

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

  getBackgroundColor(project: Project): string {
    if (project === this.selectedProject) {
      return project.color;
    }
  }

  setBackgroundColorHeader(){
    if (this.selectedProject && !this.selectedProject.completed){
      return this.selectedProject.color;
    }
  }

  play(){
    if (!this.playButtonPressed && !this.playButton.disabled && this.selectedProject){
      this.playButtonPressed = true;
      this.symbolButton = '■';
    } else if (this.playButtonPressed) {
      this.playButtonPressed = false;
      this.selectedProject = null;
      this.symbolButton = '▶';
    }
  }

  openProjectCreationDialog(): void {
    // TODO
  }

  getCompletionIcon(): string {
    if (this.selectedProject.completed) {
      return 'swap_vert';
    }
    return 'check_circle';
  }
}
