import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditRecordDialog} from './edit-record.dialog';

describe('EditRecordDialog', () => {
  let component: EditRecordDialog;
  let fixture: ComponentFixture<EditRecordDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecordDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
