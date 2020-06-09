import {Injectable} from '@angular/core';
import {Record} from '../models/record';
import {Project} from '../models/project';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpClient: HttpClient) { }

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
