import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../models/project';
import {TaskService} from '../../../services/task.service';


@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './create-task.dialog.html',
  styleUrls: ['./create-task.dialog.scss']
})

export class CreateTaskDialog {

  taskForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateTaskDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Project,
              private fb: FormBuilder,
              private service: TaskService
  ) {
    this.taskForm = this.fb.group({
      taskDescription: ''
    });
  }

  createTask() {
    try {
      this.service.createTask(this.data, this.taskForm.get('taskDescription').value)
        .subscribe(task => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }
}

