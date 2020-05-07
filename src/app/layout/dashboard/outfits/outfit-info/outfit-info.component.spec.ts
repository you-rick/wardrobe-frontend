import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitInfoComponent } from './outfit-info.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OutfitInfoComponent', () => {
  let component: OutfitInfoComponent;
  let fixture: ComponentFixture<OutfitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitInfoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
