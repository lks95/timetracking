import {Injectable} from '@angular/core';
import {Record} from '../models/record';
import {Project} from '../models/project';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private recordCreation = new Subject<Record>();
  onRecordCreation = this.recordCreation.asObservable().pipe(share());

  private recordChanged = new Subject<Record>();
  onRecordChanged = this.recordChanged.asObservable().pipe(share());

  private recordDeletion = new Subject<Record>();
  onRecordDeletion = this.recordDeletion.asObservable().pipe(share());

  constructor(private httpClient: HttpClient) {
  }

  startProjectRecording(element: Project): Observable<Record> {
    console.log('Start of project recording triggered.');
    const request = this.httpClient.post<Record>(apiUrl + 'records/start', {
      project: element._id
    }).pipe(
      share()
    );

    request.subscribe(record => {
      this.recordCreation.next(record);
      console.log('Record creation triggered.');
    });
    return request;
  }

  startTaskRecording(element: Task) {
    console.log('Start of task recording triggered.');
    const request = this.httpClient.post<Record>(apiUrl + 'records/start', {
      task: element._id
    }).pipe(
      share()
    );

    request.subscribe(record => {
      this.recordCreation.next(record);
      console.log('Record creation triggered.');
    });
    return request;
  }

  stopRecord(record: Record) {
    const request = this.httpClient.post<Record>(apiUrl + 'records/' + record._id + '/stop', {})
      .pipe(
        share()
      );
    request.subscribe(value => {
      console.log(value);
      this.recordChanged.next(value);
      console.log('Record completion triggered.');
    });
    return request;
  }

  createRecord(project: Project, task: Task, startTime: string, endTime: string): Observable<Record> {
    const body = task ? {
      task: task._id,
      startTime,
      endTime
    } : {
      project: project._id,
      startTime,
      endTime
    };
    const request = this.httpClient.post<Record>(apiUrl + 'records', body).pipe(
      share()
    );

    request.subscribe(record => {
      this.recordCreation.next(record);
      console.log('Record creation triggered.');
    });
    return request;
  }

  editRecord(record: Record, startTime: string, endTime: string): Observable<Record> {

    const request = this.httpClient.patch<Record>(apiUrl + 'records/' + record._id, {
      startTime,
      endTime
    }).pipe(
      share()
    );

    request.subscribe(result => {
      this.recordChanged.next(result);
      console.log('Record creation triggered.');
    });
    return request;
  }

  deleteRecord(record: Record): Observable<any> {
    const request = this.httpClient.delete<Record>(apiUrl + 'records/' + record._id).pipe(
      share()
    );

    request.subscribe(result => {
      this.recordDeletion.next(record);
      console.log('Record deletion triggered.');
    });
    return request;
  }
}
