import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskCreation = new Subject<Task>();
  onTaskCreation = this.taskCreation.asObservable();

  private taskSelection = new BehaviorSubject<Task>(null);
  onTaskSelection = this.taskSelection.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  selectTask(task: Task) {
    this.taskSelection.next(task);
  }

  createTask(project: Project, taskDescription: string): Observable<Task> {
    const request = this.httpClient.post<Task>(apiUrl + 'projects/' + project._id + '/tasks', {
      description: taskDescription
    }).pipe(
      share()
    );

    request.subscribe(task => {
      this.taskCreation.next(task);
    });

    return request;
  }

}
