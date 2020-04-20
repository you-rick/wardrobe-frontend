import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ImageCroppedEvent} from "ngx-image-cropper";

import {Item} from "../../../../shared/models/item.model";
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";

import {ItemType} from "../../../../shared/enums/item-type.enum";
import {ItemWeather} from "../../../../shared/enums/item-weather.enum";
import {switchMap} from "rxjs/operators";

import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public newItem: Item;
  public itemTypes = ItemType;
  public itemWeather = ItemWeather;
  public itemPhoto;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public edit: boolean;
  public envPath = environment.API_URL;

  toastAutohide = true;

  @ViewChild('inputFile', {static: true}) inputFile: ElementRef;

  constructor(
    private itemService: ItemService,
    public toastService: ToastService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.resetForm();

    if (this.route.snapshot.data.edit) {
      this.fetchItem();
      this.edit = true;
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newItem = new Item();
  }

  fetchItem() {
    this.route.params.pipe(
      switchMap(params => this.itemService.getItemInfo(params.id))
    ).subscribe((result: Item) => {
      this.newItem = result;
    });
  }


  fileChangeEvent(event: any): void {
    if (event.target.files[0].size <= 600000) {
      this.imageChangedEvent = event;
    } else {
      this.inputFile.nativeElement.value = "";
      this.toastService.show('File is too big', {classname: 'bg-danger text-light'});
    }

  }

  imageCropped(event: ImageCroppedEvent) {
    this.itemPhoto = event.base64;
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

    if (form.valid && this.itemPhoto) {
      form.value.photo = this.itemPhoto;

      if (this.edit) {
        this.itemService.putItem(form.value).subscribe((response) => {
          console.log(response);
          this.resetForm(form);
          this.toastService.show('Item successfully updated!', {classname: 'bg-success text-light'});
        });
      } else {
        this.itemService.postItem(form.value).subscribe((response) => {
          console.log(response);
          this.resetForm(form);
          this.toastService.show('Item successfully saved!', {classname: 'bg-success text-light'});
        });
      }
    } else {
       this.toastService.show('Form is not valid. Please add required information', {classname: 'bg-danger text-light'});
    }
  }

}
