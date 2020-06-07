import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';



interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'createproject',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit{

  colors: Color[] = [
    {value: 'blue-1', viewValue: 'Blue'},
    {value: 'red-2', viewValue: 'Red'},
    {value: 'green-3', viewValue: 'Green'},
    {value: 'yellow-4', viewValue: 'Yellow'},
    {value: 'cyan-5', viewValue: 'Cyan'}
  ];

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      project: '',
      color: ''
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  onClickFinish(){
  }
  onClickClose(){
  }
}

