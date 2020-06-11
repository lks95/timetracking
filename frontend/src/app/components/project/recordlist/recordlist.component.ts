import {Component, Input, OnInit} from '@angular/core';
import {Record} from '../../../models/record';
import {RecordService} from '../../../services/record.service';
import {MatDialog} from '@angular/material/dialog';
import {EditRecordDialog} from '../../dialogs/edit-record/edit-record.dialog';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.scss']
})
export class RecordlistComponent implements OnInit {

  @Input() records: Record[] = [];

  constructor(
    private recordService: RecordService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openEditRecordDialog(record: Record): void {
    const dialogRef = this.dialog.open(EditRecordDialog, {
      minHeight: '128px',
      maxHeight: '100%',
      minWidth: '512px',
      maxWidth: '90%',
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedProject = result;
    });
  }
}
