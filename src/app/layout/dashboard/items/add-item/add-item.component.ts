import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ImageCroppedEvent} from "ngx-image-cropper";

import {Item} from "../../../../shared/models/item.model";
import {ItemService} from "../../../../shared/services/item.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public newItem: Item;
  public itemPhoto;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public isFileBig = 0;

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newItem = new Item();

  }

  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
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
    if (this.itemPhoto) {
      form.value.photo = this.itemPhoto;

      this.itemService.postItem(form.value).subscribe((response) => {
        console.log(response);
        this.resetForm(form);
        // M.toast({html: 'Yey! it is saved!', classes: 'rounded'});
      });

    }
  }

}
