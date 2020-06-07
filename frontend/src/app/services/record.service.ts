import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { RECORDS } from './mock-records';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  getRecords(): Observable<Record[]> {
    return of(RECORDS);
  }

}
