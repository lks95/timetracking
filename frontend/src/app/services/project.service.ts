import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, share} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import {Project} from '../models/project';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectCreation = new Subject<Project>();
  onProjectCreation = this.projectCreation.asObservable().pipe(share());

  private projectSelection = new BehaviorSubject<Project>(null);
  onProjectSelection = this.projectSelection.asObservable().pipe(share());

  private projectUpdate = new Subject<Project>();
  onProjectUpdate = this.projectUpdate.asObservable().pipe(share());

  constructor(private httpClient: HttpClient) {

    this.onProjectUpdate.subscribe(project => {
      const selectedProject = this.projectSelection.getValue();
      if (project._id === selectedProject._id) {
        selectedProject.name = project.name;
        selectedProject.color = project.color;
        selectedProject.completed = project.completed;
        this.projectSelection.next(selectedProject);
      }
    });
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(apiUrl + 'projects');
  }

  getProject(id: string): Observable<Project> {
    return this.httpClient.get<Project>(apiUrl + 'projects/' + id);
  }

  createProject(project: string, colorValue?: string): Observable<Project> {
    console.log('Create project with ' + project + ' and  ' + colorValue);
    const request = this.httpClient.post<Project>(apiUrl + 'projects', {
      name: project,
      color: colorValue
    }).pipe(
      share(),
      catchError(this.handleError)
    );

    request.subscribe(result => {
      this.projectCreation.next(result);
    });

    return request;
  }

  setCompletionProject(project: Project, completedState: boolean): Observable<Project> {
    const newProject = {
      _id: project._id,
      completed: completedState
    };
    return this.updateProject(newProject);
  }

  selectProject(project: Project) {
    // this.selectedProject = project;
    this.projectSelection.next(project);
  }

  updateProjectInfo(project: Project, projectName: string, colorValue: string): Observable<Project> {
    console.log('Update project information of project ' + project._id);
    const newProject = {
      _id: project._id,
      name: projectName,
      color: colorValue
    };
    return this.updateProject(newProject);
  }

  updateProject(project: { _id: string, name?: string, color?: string, completed?: boolean }): Observable<Project> {
    const request = this.httpClient.patch<Project>(apiUrl + 'projects/' + project._id, project).pipe(
      share(),
      catchError(this.handleError)
    );

    request.subscribe(result => {
      this.projectUpdate.next(result);
    });

    return request;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
