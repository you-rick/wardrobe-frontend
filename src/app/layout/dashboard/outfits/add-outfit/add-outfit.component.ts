import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddItemComponent} from "../../items/add-item/add-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

import {Outfit} from "../../../../shared/models/outfit.model";
import {OutfitService} from "../../../../shared/services/outfit.service";
import {ItemService} from "../../../../shared/services/item.service";

import {ItemType} from "../../../../shared/enums/item-type.enum";
import {ItemWeather} from "../../../../shared/enums/item-weather.enum";

import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-add-outfit',
  templateUrl: './add-outfit.component.html',
  styleUrls: ['./add-outfit.component.scss']
})
export class AddOutfitComponent implements OnInit {
  public newOutfit: Outfit;
  public outfitTypes = ItemType;
  public outfitWeather = ItemWeather;
  public itemsList;
  public selectedItems: any[];
  public edit: boolean;
  public checkedItems: any[];
  public envPath = environment.API_URL;

  constructor(
    private outfitService: OutfitService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.resetForm();

    if (this.route.snapshot.data.edit) {
      this.fetchOutfit();
      this.edit = true;
    }

    this.fetchItems();
  }


  fetchOutfit() {
    this.route.params.pipe(
      switchMap(params => this.outfitService.getOutfitInfo(params.id))
    ).subscribe((result: Outfit) => {
      this.newOutfit = result;
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

  showAddItemForm() {
    const modalRef = this.modalService.open(AddItemComponent);
    modalRef.componentInstance.isModal = true;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newOutfit = new Outfit();
  }

  onSubmit(form: NgForm) {
    form.value.items = this.selectedItems;
    console.log(form.value);

    if (form.valid) {

      if (this.edit) {
        if(!form.value.items) {
          form.value.items = this.checkedItems;
        }

        this.outfitService.putOutfit(form.value).subscribe(res => {
          let collId = form.value._id;
          this.resetForm(form);
          this.router.navigateByUrl('/dashboard/outfits/' + collId, {state: {'outfitUpdated': true}});
        });
      } else {
        this.outfitService.postOutfit(form.value).subscribe(res => {
          this.resetForm(form);
          this.router.navigateByUrl('/dashboard/outfits', {state: {'outfitAdded': true}});
        });
      }

    }
  }
}
