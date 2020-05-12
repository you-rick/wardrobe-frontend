import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemsListComponent} from './items-list.component';
import {ItemService} from "../../../../shared/services/item.service";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from '@angular/common';
import {DOMHelper} from "../../../../../testing/dom-helper";
import {of} from "rxjs";
import {Item} from "../../../../shared/models/item.model";

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let dh: DOMHelper<ItemsListComponent>;
  let itemServiceMock: any;
  let helper: itemHelper;

  beforeEach(async(() => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['getItemList']);
    itemServiceMock.getItemList.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ItemsListComponent, testAddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'add', component: testAddComponent}
        ]),
        HttpClientTestingModule
      ],
      providers: [
        {provide: ItemService, useValue: itemServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    helper = new itemHelper();
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
    dh.clickButton('Add New item');

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/add');
    });
  }));


  it ('should show "No Items", when itemsList empty', () => {
    expect(dh.count('.no-items')).toBe(1);
  });


  it ('should show only 1 item in list', () => {
    component.itemsList = helper.getItems(1);
    fixture.detectChanges();
    expect(dh.count('.item-box')).toBe(1);
  });


  it ('should call "getItemList" of the ItemService one time on ngOnInit', () => {
    fixture.detectChanges();
    expect(itemServiceMock.getItemList).toHaveBeenCalledTimes(1);
  });

});


// Dummy component for route testing
@Component({template: ''})
class testAddComponent {
}

// Create necessary amount of dummy items
class itemHelper {
  itemsList:Item[] = [];
  getItems(amount: number):Item[] {
    for (let i = 0; i < amount; i++) {
      this.itemsList.push(
        { _id: 'abc' + i, title: 'test', photo: '/upload/name' + i + '.jpg', type: ['text'] }
      );
    }
    return this.itemsList;
  }
}
