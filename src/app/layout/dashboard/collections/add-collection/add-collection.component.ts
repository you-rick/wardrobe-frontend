import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {switchMap} from "rxjs/operators";

import {Item} from "../../../../shared/models/item.model";
import {Collection} from "../../../../shared/models/collection.model";

import {CollectionService} from "../../../../shared/services/collection.service";
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";

import {ItemType} from "../../../../shared/enums/item-type.enum";
import {ItemWeather} from "../../../../shared/enums/item-weather.enum";

import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent implements OnInit {
  public newCollection: Collection;
  public collectionTypes = ItemType;
  public collectionWeather = ItemWeather;
  public itemsList;
  public collectionPhoto;
  public selectedItems: any[];
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public edit: boolean;
  public envPath = environment.API_URL;

  @ViewChild('inputFile', {static: true}) inputFile: ElementRef;

  constructor(
    private collectionService: CollectionService,
    private itemService: ItemService,
    public toastService: ToastService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.resetForm();
    this.fetchItems();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files[0].size <= 600000) {
      this.imageChangedEvent = event;
    } else {
      this.inputFile.nativeElement.value = "";
      this.toastService.show('File is too big', {classname: 'bg-danger text-light'});
    }
  }

  fetchItems() {
    this.itemService.getItemList().subscribe(items => {
      this.itemsList = items;
    });
  }

  onItemSelect(value) {
    this.selectedItems = Object.keys(value).filter(key => !!value[key]);
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newCollection = new Collection();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.collectionPhoto = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  onSubmit(form: NgForm) {
    form.value.items = this.selectedItems;
    console.log(form.value);

    if (form.valid) {
      console.log("Valid!");
      this.collectionService.postCollection(form.value).subscribe(res => {
        console.log(res);
        this.resetForm(form);
        this.toastService.show('Collection successfully created!', {classname: 'bg-success text-light'});
      });
    }
  }
}
