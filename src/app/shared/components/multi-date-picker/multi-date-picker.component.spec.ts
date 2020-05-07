import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiDatePickerComponent} from './multi-date-picker.component';
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

describe('MultiDatePickerComponent', () => {
  let component: MultiDatePickerComponent;
  let fixture: ComponentFixture<MultiDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiDatePickerComponent],
      imports: [NgbDatepickerModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
