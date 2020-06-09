import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('playButton') playButton;

  projects: Project[] = [];
  selectedProject: Project;
  playButtonPressed = false;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    this.subscribeToObservables();
  }

  subscribeToObservables() {
    this.projectService.onProjectCreation.subscribe(project => {
      this.projects.push(project);
      this.sortProjects();
    });
    this.projectService.onProjectSelection.subscribe(project => {
      this.selectedProject = project;
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    if (!this.playButtonPressed && this.selectedProject === project) {
      this.projectService.selectProject(null);
    } else if (!this.playButtonPressed) {
      this.projectService.selectProject(project);
    }
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.sortProjects();
      });
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

  openDetails(project: Project, event: any): void {
    this.selectedProject !== project ? this.onSelect(project) : event.stopPropagation();
    this.router.navigate(['/projects/' + project._id]);
  }

  /**
   * Sort projects by name attribute in ascending order
   */
  sortProjects(): void {
    this.projects.sort((a, b) => {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
  }
}
