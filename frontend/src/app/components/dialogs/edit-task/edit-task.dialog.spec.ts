import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditTaskDialog} from './edit-task.dialog';

describe('EditTaskDialog', () => {
  let component: EditTaskDialog;
  let fixture: ComponentFixture<EditTaskDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
