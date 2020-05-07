import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgbToastModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
