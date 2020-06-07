import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-create-project',
  templateUrl: './create-project.dialog.html',
  styleUrls: ['./create-project.dialog.scss']
})

export class CreateProjectDialog {

  colors: string[] = [
    '#2c7a70',
    '#f47921',
    '#ef4070',
    '#934073',
    '#2593af',
    '#cdaf2b',
    '#60ad45',
    '#d93a40'
  ];

  selectedColor?: string;
  projectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateProjectDialog>,
              private fb: FormBuilder
              // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.projectForm = this.fb.group({
      projectName: '',
      color: ''
    });
    this.projectForm.valueChanges.subscribe(console.log);
  }

  createProject(){
    // TODO Create project
  }
}

