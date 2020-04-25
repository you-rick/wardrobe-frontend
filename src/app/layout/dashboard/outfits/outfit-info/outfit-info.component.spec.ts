import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitInfoComponent } from './outfit-info.component';

describe('OutfitInfoComponent', () => {
  let component: OutfitInfoComponent;
  let fixture: ComponentFixture<OutfitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitInfoComponent ]
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
