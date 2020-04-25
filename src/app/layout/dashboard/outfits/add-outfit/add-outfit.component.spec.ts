import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutfitComponent } from './add-outfit.component';

describe('AddOutfitComponent', () => {
  let component: AddOutfitComponent;
  let fixture: ComponentFixture<AddOutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOutfitComponent ]
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
