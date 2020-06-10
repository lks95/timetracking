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

  private recordCompletion = new Subject<Record>();
  onRecordCompletion = this.recordCompletion.asObservable().pipe(share());

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
      this.recordCompletion.next(value);
      console.log('Record completion triggered.');
    });
    return request;
  }
}
