import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

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

  fileChange(e) {
    this.itemPhoto = e.target.files[0];
  }

  onSubmit(form: NgForm) {
    if (this.itemPhoto) {
      let formData = new FormData();
      formData.append('photo', this.itemPhoto);
      formData.append('title', form.value.title);

      this.itemService.postItem(formData).subscribe((response) => {
        console.log(response);
        this.resetForm(form);
        // M.toast({html: 'Yey! it is saved!', classes: 'rounded'});
      });

    }
  }

}
