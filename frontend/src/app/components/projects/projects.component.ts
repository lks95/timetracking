import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[] = [];
  selectedProject: Project;

  private projectCreationSub: Subscription;
  private projectUpdateSub: Subscription;
  private projectSelectionSub: Subscription;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.getProjects();
    this.subscribeToObservables();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  subscribeToObservables() {
    this.projectCreationSub = this.projectService.onProjectCreation.subscribe(project => {
      this.projects.push(project);
      this.sortProjects();
    });

    this.projectSelectionSub = this.projectService.onProjectSelection.subscribe(project => {
      this.selectedProject = project;
    });

    this.projectUpdateSub = this.projectService.onProjectUpdate.subscribe(project => {
      const index = this.projects.findIndex(t => t._id === project._id);
      this.projects[index] = project;
    });
  }

  private unsubscribe() {
    this.projectSelectionSub.unsubscribe();
    this.projectCreationSub.unsubscribe();
  }

  onSelect(project: Project): void {
    if (this.selectedProject?._id === project?._id) {
      this.projectService.selectProject(null);
    } else {
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
