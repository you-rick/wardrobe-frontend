import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal, NgbCarousel, NgbCarouselConfig, NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Options} from 'ng5-slider';
import {AddItemComponent} from "../../items/add-item/add-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap, tap} from "rxjs/operators";
import * as moment from "moment";

import {Outfit} from "../../../../shared/models/outfit.model";
import {OutfitService} from "../../../../shared/services/outfit.service";
import {Item} from "../../../../shared/models/item.model";
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";

import {ItemWeather} from "../../../../shared/enums/item-weather.enum";
import {ItemType} from "../../../../shared/enums/item-type.enum";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-add-outfit',
  templateUrl: './add-outfit.component.html',
  styleUrls: ['./add-outfit.component.scss']
})
export class AddOutfitComponent implements OnInit {
  @ViewChildren('slider') slider: QueryList<any>;

  public newOutfit: Outfit;
  public outfitWeather = ItemWeather;
  public outfitTypes = ItemType;
  public today = moment().subtract(1, 'days');
  public edit: boolean;
  public envPath = environment.API_URL;
  public slides: any[] = [];
  public zoomRangeValue: number = 1;
  public datesSelected: NgbDateStruct[] = [];
  public zoomRangeOptions: Options = {
    floor: 0.5,
    ceil: 1,
    step: 0.1,
    showTicks: true
  }


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
      tap((outfit: Outfit) => {
        this.datesSelected = outfit.dates.map(date => this.modelToNgbDate(date));
        this.newOutfit = outfit;
      }),
      switchMap(outfit => this.itemService.getItemList(outfit.items))
    ).subscribe((items: Item[]) => {

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

  dateChange(valueList: NgbDateStruct[]) {
    this.newOutfit.dates = valueList.map(date => this.ngbDateToModel(date));
  }

  ngbDateToModel(date: NgbDateStruct): moment.Moment {
    if (!date) {
      return null;
    }
    return moment(date.year + '-' + date.month + '-' + date.day, 'YYYY-MM-DD');
  }

  modelToNgbDate(date): NgbDateStruct {
    let d = moment(date, 'YYYY-MM-DD');
    if (!date) {
      return null;
    }
    console.log(d, d.year(), d.month() + 1, d.date() + 1);
    return {year: d.year(), month: d.month() + 1, day: d.date() + 1};
  }

  removeSlider(id) {
    this.slides.splice(id, 1);
    console.log(id);
  }

  showAddItemForm() {
    const modalRef = this.modalService.open(AddItemComponent);
    modalRef.componentInstance.isModal = true;
    modalRef.componentInstance.submitFormEvent.subscribe((item: Item) => {
      if (item) {
        this.toastService.show('Item successfully added', {classname: 'bg-success text-light'});
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
    form.value.dates = this.newOutfit.dates;
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
