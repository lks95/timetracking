import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {noWhitespaceValidator} from '../../validators/Validators';


@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './edit-task.dialog.html',
  styleUrls: ['./edit-task.dialog.scss']
})

export class EditTaskDialog {

  taskForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditTaskDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Task,
              private fb: FormBuilder,
              private service: TaskService
  ) {
    this.taskForm = this.fb.group({
      taskDescription: new FormControl(data.description, [Validators.required, noWhitespaceValidator])
    });
  }

  editTask() {
    try {
      this.service.editTask(this.data, this.taskForm.get('taskDescription').value)
        .subscribe(task => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }

  deleteTask() {
    try {
      this.service.deleteTask(this.data)
        .subscribe(result => {
          this.dialogRef.close();
        });
    } catch (error) {
      console.log('An error occurred.');
    }
  }
}

