import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemsListComponent} from './items-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {Location} from '@angular/common';
import {DOMHelper} from "../../../../../testing/dom-helper";

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let dh: DOMHelper<ItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsListComponent, testAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'add', component: testAddComponent}
        ]),
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an h2 tag', () => {
    expect(dh.singleText('h2')).toBe('Items');
  });

  it('should be at "/" route of module', () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  });

  // add "async" to prevent "SPEC HAS NO EXPECTATIONS" alert
  it ('should redirect to "/add" on button click', async(() => {
    const location = TestBed.get(Location);
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addButton:HTMLButtonElement = buttons[0].nativeElement;

    addButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/add');
    });
  }));

  it ('should show "No Items", when itemsList empty', () => {
    const noItems = fixture.debugElement.queryAll(By.css('.no-items'));
    expect(noItems.length).toBe(1);
  });

  it ('should show only 1 item in list', () => {
    component.itemsList = [
      { _id: '', title: 'test', photo: '/test/test', type: ['text'] }
    ];
    fixture.detectChanges();
    const listItem = fixture.debugElement.queryAll(By.css('.item-box'));
    expect(listItem.length).toBe(1);
  });

});


// Dummy component for route testing
@Component({template: ''})
class testAddComponent {
}
