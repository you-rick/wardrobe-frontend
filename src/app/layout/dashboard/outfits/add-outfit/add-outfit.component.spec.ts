import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddOutfitComponent} from './add-outfit.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AddOutfitComponent', () => {
  let component: AddOutfitComponent;
  let fixture: ComponentFixture<AddOutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddOutfitComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgbCarouselModule,
        FormsModule,
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
