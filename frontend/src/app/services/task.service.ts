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
  onTaskCreation = this.taskCreation.asObservable().pipe(share());

  private taskSelection = new BehaviorSubject<Task>(null);
  onTaskSelection = this.taskSelection.asObservable().pipe(share());

  private taskUpdate = new Subject<Task>();
  onTaskUpdated = this.taskUpdate.asObservable().pipe(share());

  private taskDeletion = new Subject<Task>();
  onTaskDeleted = this.taskDeletion.asObservable().pipe(share());

  constructor(private httpClient: HttpClient) {
    this.onTaskUpdated.subscribe(task => {
      const selectedTask = this.taskSelection.getValue();
      if (task._id === selectedTask?._id) {
        selectedTask.description = task.description;
        selectedTask.completed = task.completed;
        this.taskSelection.next(selectedTask);
      }
    });
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


  editTask(task: Task, taskDescription: string): Observable<Task> {
    return this.updateTask(task, taskDescription, task.completed);
  }

  setTaskCompletion(task: Task, completed: boolean): Observable<Task> {
    return this.updateTask(task, task.description, completed);
  }

  updateTask(task: Task, taskDescription: string, completion: boolean): Observable<Task> {
    const request = this.httpClient.patch<Task>(apiUrl + 'tasks/' + task._id, {
      description: taskDescription,
      completed: completion
    }).pipe(
      share()
    );

    request.subscribe(result => {
      this.taskUpdate.next(result);
    });

    return request;
  }

  deleteTask(task: Task): Observable<any> {
    const request = this.httpClient.delete<Task>(apiUrl + 'tasks/' + task._id).pipe(share());

    request.subscribe(result => {
      this.taskDeletion.next(task);
      if (task._id === this.taskSelection.getValue()?._id) {
        this.taskSelection.next(null);
      }
    });

    return request;
  }
}
