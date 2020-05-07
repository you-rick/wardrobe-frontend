import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemInfoComponent} from './item-info.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ItemInfoComponent', () => {
  let component: ItemInfoComponent;
  let fixture: ComponentFixture<ItemInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgbToastModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
