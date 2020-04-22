import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {switchMap} from "rxjs/operators";

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
  public checkedItems: any[];
  public envPath = environment.API_URL;

  constructor(
    private collectionService: CollectionService,
    private itemService: ItemService,
    public toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetForm();

    if (this.route.snapshot.data.edit) {
      this.fetchCollection();
      this.edit = true;
    }

    this.fetchItems();
  }

  fileChangeEvent(event: any): void {
    if (event.target.files[0].size <= 600000) {
      this.imageChangedEvent = event;
    } else {
      event.target.value = "";
      this.toastService.show('File is too big', {classname: 'bg-danger text-light'});
    }
  }

  fetchCollection() {
    this.route.params.pipe(
      switchMap(params => this.collectionService.getCollectionInfo(params.id))
    ).subscribe((result: Collection) => {
      this.newCollection = result;
      this.checkedItems = result.items;
      console.log(this.checkedItems);
    });
  }

  fetchItems() {
    this.itemService.getItemList().subscribe(items => {
      this.itemsList = items;
    });
  }

  onItemSelect(value) {
    this.selectedItems = Object.keys(value).filter(key => !!value[key]);
    console.log(this.selectedItems);
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

    if (this.collectionPhoto) {
      form.value.photo = this.collectionPhoto;
    }

    if (form.valid) {

      if (this.edit) {
        if(!form.value.items) {
          form.value.items = this.checkedItems;
        }

        this.collectionService.putCollection(form.value).subscribe(res => {
          let collId = form.value._id;
          this.resetForm(form);
          this.router.navigateByUrl('/dashboard/collections/' + collId, {state: {'collectionUpdated': true}});
        });
      } else {
        this.collectionService.postCollection(form.value).subscribe(res => {
          this.resetForm(form);
          this.router.navigateByUrl('/dashboard/collections', {state: {'collectionAdded': true}});
        });
      }

    }
  }
}
