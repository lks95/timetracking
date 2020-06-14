import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project';


@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './edit-project.dialog.html',
  styleUrls: ['./edit-project.dialog.scss']
})

export class EditProjectDialog {

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

  constructor(public dialogRef: MatDialogRef<EditProjectDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Project,
              private fb: FormBuilder,
              private service: ProjectService
  ) {
    this.projectForm = this.fb.group({
      projectName: data.name
    });
    this.projectForm.valueChanges.subscribe(console.log);
    this.selectedColor = data.color;
  }

  updateProject() {
    try {
      this.service.updateProjectInfo(this.data, this.projectForm.get('projectName').value, this.selectedColor)
        .subscribe(project => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }

  deleteProject() {
    try {
      this.service.deleteProject(this.data)
        .subscribe(result => {
          this.dialogRef.close();
        });
    } catch (error) {
      // TODO Add properly error handling
      console.log('An error occurred.');
    }
  }
}

