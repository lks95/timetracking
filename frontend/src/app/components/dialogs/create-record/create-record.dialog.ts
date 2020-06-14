import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../models/project';
import {Task} from '../../../models/task';
import {RecordService} from '../../../services/record.service';


@Component({
  selector: 'app-dialog-create-record',
  templateUrl: './create-record.dialog.html',
  styleUrls: ['./create-record.dialog.scss']
})

export class CreateRecordDialog {

  recordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateRecordDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { project: Project | null, task: Task | null },
              private fb: FormBuilder,
              private service: RecordService
  ) {
    this.recordForm = this.fb.group({
      startTime: '',
      endTime: '',
    });
    this.recordForm.valueChanges.subscribe(console.log);
  }

  createRecord() {
    try {
      this.service.createRecord(this.data.project, this.data.task,
        this.recordForm.get('startTime').value, this.recordForm.get('endTime').value)
        .subscribe(record => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }

  isValidInput(): boolean {
    console.log('plain value ' + this.recordForm.get('startTime').value);
    return this.recordForm.get('endTime').value && this.recordForm.get('startTime').value &&
      0 < new Date(this.recordForm.get('endTime').value).getTime() - new Date(this.recordForm.get('startTime').value).getTime();
  }
}

