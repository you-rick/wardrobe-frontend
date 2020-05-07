import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      imports: [
        FormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
