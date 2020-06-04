import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'newtask',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})

export class NewTaskComponent implements OnInit{

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      task: ''
    });
    this.myForm.valueChanges.subscribe(console.log);
  }
  onClickFinish(){
  }
  onClickClose(){
  }
}
