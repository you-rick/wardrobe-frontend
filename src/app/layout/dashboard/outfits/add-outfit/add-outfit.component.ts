import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal, NgbCarousel, NgbCarouselConfig, NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddItemComponent} from "../../items/add-item/add-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap, switchMap, tap} from "rxjs/operators";

import {Outfit} from "../../../../shared/models/outfit.model";
import {OutfitService} from "../../../../shared/services/outfit.service";
import {Item} from "../../../../shared/models/item.model";
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";

import {ItemType} from "../../../../shared/enums/item-type.enum";
import {ItemWeather} from "../../../../shared/enums/item-weather.enum";

import {environment} from "../../../../../environments/environment";
import {from} from "rxjs";

@Component({
  selector: 'app-add-outfit',
  templateUrl: './add-outfit.component.html',
  styleUrls: ['./add-outfit.component.scss']
})
export class AddOutfitComponent implements OnInit {
  @ViewChildren('slider') slider: QueryList<any>;

  public newOutfit: Outfit;
  public outfitTypes = ItemType;
  public outfitWeather = ItemWeather;
  public itemsList;
  public selectedItems: any[];
  public edit: boolean;
  public checkedItems: any[];
  public envPath = environment.API_URL;
  public slides: any[] = [];

  constructor(
    private outfitService: OutfitService,
    private itemService: ItemService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private sliderConfig: NgbCarouselConfig,
    private tabConfig: NgbNavConfig
  ) {
    sliderConfig.interval = 0;
    tabConfig.destroyOnHide = false;
  }

  ngOnInit() {
    this.resetForm();

    if (this.route.snapshot.data.edit) {
      this.fetchOutfit();
      this.edit = true;
    }
  }


  fetchOutfit() {
    this.route.params.pipe(
      switchMap(params => this.outfitService.getOutfitInfo(params.id)),
      tap((outfit:Outfit) => this.newOutfit = outfit),
      switchMap(outfit => this.itemService.getItemList(outfit.items))
    ).subscribe((items:Item[]) => {

      items.forEach(item => {
        let obj = {
          "activeId": item._id,
          "items": []
        }
        this.itemService.getItemListByType(item.type).subscribe(items => {
          obj.items = obj.items.concat(items);
          this.slides.push(obj);
          console.log(items);
        });
      });
    });
  }

  fetchItems() {
    this.itemService.getItemList().subscribe(items => {
      this.itemsList = items;
    });
  }

  /*
  onItemSelect(value) {
    this.selectedItems = Object.keys(value).filter(key => !!value[key]);
    console.log(this.selectedItems);
  }
  */

  showAddItemForm() {
    const modalRef = this.modalService.open(AddItemComponent);
    modalRef.componentInstance.isModal = true;
    modalRef.componentInstance.submitFormEvent.subscribe((item: Item) => {
      if (item) {
        this.getImagesByItemType(item.type, item._id);
        modalRef.close();
      }
    });
  }


  getImagesByItemType(type, activeId?: string) {
    this.itemService.getItemListByType(type).subscribe((items: Item[]) => {
      let obj = {
        "items": items,
        "activeId": activeId
      }
      if (items.length) {
        this.slides.push(obj);
      } else {
        this.toastService.show('This type has not associated items', {classname: 'bg-danger text-light'});
      }

      console.log(this.slides);

    });
  }

  onSlide(e) {
    console.log(e);
  }

  addExistingItem(e) {
    let type = e.target.value;
    type !== 0 && this.getImagesByItemType(type);
    e.target.value = 0;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.newOutfit = new Outfit();
  }


  onSubmit(form: NgForm) {
    form.value.items = this.slider.map(el => el.activeId);
    console.log(form.value);

    if (form.value.items < 2) {
      this.toastService.show('Outfit should have at least 2 items selected', {classname: 'bg-danger text-light'});

    } else {
      if (form.valid) {
        if (this.edit) {
          this.outfitService.putOutfit(form.value).subscribe(res => {
            let outfitId = form.value._id;
            this.resetForm(form);
            this.router.navigateByUrl('/dashboard/outfits/' + outfitId, {state: {'outfitUpdated': true}});
          });
        } else {
          this.outfitService.postOutfit(form.value).subscribe(res => {
            this.resetForm(form);
            this.router.navigateByUrl('/dashboard/outfits', {state: {'outfitAdded': true}});
          });
        }
      } else {
        this.toastService.show('Form is not valid. Please add required information', {classname: 'bg-danger text-light'});
      }
    }
  }
}
