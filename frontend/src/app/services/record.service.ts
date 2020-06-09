import {Injectable} from '@angular/core';
import {Record} from '../models/record';
import {Project} from '../models/project';
import {Task} from '../models/task';
import {RECORDS} from './mock-records';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, ObservableInput, Observer, of, Subject, throwError} from 'rxjs';
import {catchError, retry, share} from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpClient: HttpClient) { }

  getRecords(): Observable<Record[]> {
    return of(RECORDS);
  }

  startProjectRecording(element: Project): Observable<Record> {
    return this.httpClient.post<Record>(apiUrl + 'records/start', {
      project: element._id
    });
  }

  startTaskRecording(element: Task) {
    return this.httpClient.post<Record>(apiUrl + 'records/start', {
      task: element._id
    });
  }

  stopRecord(record: Record) {
    return this.httpClient.post<Record>(apiUrl + 'records/' + record._id + '/stop', {});
  }
}
