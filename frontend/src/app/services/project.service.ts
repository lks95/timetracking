import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECTS } from './mock-projects';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }
}
