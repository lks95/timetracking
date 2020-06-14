import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateRecordDialog} from './create-record.dialog';

describe('CreateRecordDialog', () => {
  let component: CreateRecordDialog;
  let fixture: ComponentFixture<CreateRecordDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
