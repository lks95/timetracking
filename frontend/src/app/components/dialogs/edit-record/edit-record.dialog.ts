import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Record} from '../../../models/record';
import {RecordService} from '../../../services/record.service';


@Component({
  selector: 'app-dialog-edit-record',
  templateUrl: './edit-record.dialog.html',
  styleUrls: ['./edit-record.dialog.scss']
})

export class EditRecordDialog {

  recordForm: FormGroup;
  start: Date;
  end: Date;

  constructor(public dialogRef: MatDialogRef<EditRecordDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Record,
              private fb: FormBuilder,
              private service: RecordService
  ) {
    this.start = new Date(data.startTime);
    this.end = new Date(data.endTime);
    console.log(this.start);
    this.recordForm = this.fb.group({
      startTime: this.start.toISOString().slice(0, 16),
      endTime: this.end.toISOString().slice(0, 16)
    });
    this.recordForm.valueChanges.subscribe(console.log);
  }

  editRecord() {
    try {
      this.service.editRecord(this.data, this.recordForm.get('startTime').value, this.recordForm.get('endTime').value)
        .subscribe(record => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }

  isValidInput(): boolean {
    return this.recordForm.get('endTime').value && this.recordForm.get('startTime').value &&
      0 < new Date(this.recordForm.get('endTime').value).getTime() - new Date(this.recordForm.get('startTime').value).getTime();
  }
}

