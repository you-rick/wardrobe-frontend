import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryComponent } from './laundry.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LaundryComponent', () => {
  let component: LaundryComponent;
  let fixture: ComponentFixture<LaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
