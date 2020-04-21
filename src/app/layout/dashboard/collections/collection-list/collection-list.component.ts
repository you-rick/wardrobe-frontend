import { Component, OnInit } from '@angular/core';

import {CollectionService} from "../../../../shared/services/collection.service";
import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  public collectionList;
  public envPath = environment.API_URL;

  constructor(
    private collectionService: CollectionService,
    private toastService: ToastService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.fetchCollections();
  }

  fetchCollections() {
    this.collectionService.getCollectionList().subscribe((res:any[]) => {
      let collList = []
      res.forEach(el => {
        if (el.photo.length) {
          collList.push(el);
        } else {
          console.log(el.items);
          this.itemService.getItemList(el.items).subscribe(result => {
            console.log(result);
            el.items = result;
            collList.push(el);
          });
        }
      });
      this.collectionList = collList;
    });
  }
}
