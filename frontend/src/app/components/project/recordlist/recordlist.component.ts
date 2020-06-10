import {Component, Input, OnInit} from '@angular/core';
import {Record} from '../../../models/record';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.scss']
})
export class RecordlistComponent implements OnInit {

  @Input() records: Record[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
