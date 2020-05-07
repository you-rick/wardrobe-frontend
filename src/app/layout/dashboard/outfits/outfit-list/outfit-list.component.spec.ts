import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OutfitListComponent} from './outfit-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OutfitListComponent', () => {
  let component: OutfitListComponent;
  let fixture: ComponentFixture<OutfitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutfitListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
