import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskSelection = new BehaviorSubject<Task>(null);
  onTaskSelection = this.taskSelection.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  selectTask(task: Task) {
    this.taskSelection.next(task);
  }

}
