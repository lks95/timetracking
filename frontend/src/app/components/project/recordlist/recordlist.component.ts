import {Component, Input, OnInit} from '@angular/core';
import {Record} from '../../../models/record';
import {ProjectService} from '../../../services/project.service';
import {RecordService} from '../../../services/record.service';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.scss']
})
export class RecordlistComponent implements OnInit {

  @Input() records: Record[] = [];

  constructor(
    private projectService: ProjectService,
    private recordService: RecordService
  ) {
  }

  ngOnInit(): void {
  }

  openRecordCreationDialog(): void {
    // TODO Implement me
  }
}
