import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ImageCroppedEvent} from "ngx-image-cropper";

import {Item} from "../../../../shared/models/item.model";
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";

import {ItemType} from "../../../../shared/enums/item-type.enum";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public newItem: Item;
  public itemTypes = ItemType;
  public itemPhoto;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  toastAutohide = true;

  @ViewChild('inputFile', {static: true}) inputFile: ElementRef;

  constructor(private itemService: ItemService, public toastService: ToastService) {
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
    if (event.target.files[0].size <= 500000) {
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
    if (this.itemPhoto) {
      form.value.photo = this.itemPhoto;

      this.itemService.postItem(form.value).subscribe((response) => {
        console.log(response);
        this.resetForm(form);
          this.toastService.show('Item successfully saved!', {classname: 'bg-success text-light'});

      });

    }
  }

}
