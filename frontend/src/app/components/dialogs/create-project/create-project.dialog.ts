import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../services/project.service';
import {noWhitespaceValidator} from '../../validators/Validators';


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
              private fb: FormBuilder,
              private service: ProjectService
  ) {
    this.projectForm = this.fb.group({
      projectName: new FormControl('', [Validators.required, noWhitespaceValidator]),
      color: ''
    });
    this.projectForm.valueChanges.subscribe(console.log);
  }

  createProject() {
    try {
      this.service.createProject(this.projectForm.get('projectName').value, this.selectedColor)
        .subscribe(project => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }
}

