import { Component, OnInit } from '@angular/core';

import {CollectionService} from "../../../../shared/services/collection.service";
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
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.fetchCollections();
  }

  fetchCollections() {
    this.collectionService.getCollectionList().subscribe(res => {
      this.collectionList = res;
    });
  }
}
