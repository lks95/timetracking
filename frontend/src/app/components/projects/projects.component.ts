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
  @Output() projectEmitter: EventEmitter<Project> = new EventEmitter();

  projects: Project[];
  selectedProject: Project;
  playButtonPressed = false;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    if (!this.playButtonPressed && this.selectedProject === project) {
      this.selectedProject = null;
      this.projectEmitter.emit(null);
    } else if (!this.playButtonPressed) {
      this.selectedProject = project;
      this.projectEmitter.emit(project);
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

  openDetails(project: Project, event: any): void {
    this.selectedProject !== project ? this.onSelect(project) : event.stopPropagation();
    this.router.navigate(['/projects/' + project.id]);
  }
}
