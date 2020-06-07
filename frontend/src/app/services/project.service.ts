import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, ObservableInput, Observer, of, Subject, throwError} from 'rxjs';
import {catchError, retry, share} from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Project } from '../models/project';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectCreation = new Subject<Project>();
  onProjectCreation = this.projectCreation.asObservable();

  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<Project[]> {

    return this.httpClient.get<Project[]>(apiUrl + 'projects');
  }

  getProject(id: number): Observable<Project> {
    return of(null); // of(PROJECTS.find(project => project.id === id));
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
