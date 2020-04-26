import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ItemService} from "../../../../shared/services/item.service";
import {OutfitService} from "../../../../shared/services/outfit.service";
import {Outfit} from "../../../../shared/models/outfit.model";
import {ToastService} from "../../../../shared/services/toast.service";

import {environment} from "../../../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {Item} from "../../../../shared/models/item.model";


@Component({
  selector: 'app-outfit-info',
  templateUrl: './outfit-info.component.html',
  styleUrls: ['./outfit-info.component.scss']
})
export class OutfitInfoComponent implements OnInit {
  private historyState = window.history.state;
  public selectedOutfit: Outfit;
  public envPath = environment.API_URL;

  constructor(
    private itemService: ItemService,
    private outfitService: OutfitService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.historyState) {
      this.historyState.outfitUpdated && this.toastService.show('Outfit successfully updated!', {classname: 'bg-success text-light'});
    }

    this.fetchOutfitInfo();
  }

  fetchOutfitInfo() {
    this.route.params.pipe(
      switchMap(params => this.outfitService.getOutfitInfo(params.id))
    ).subscribe((outfit: Outfit) => {
      let outfitItemsLength = outfit.items.length;
      if (outfit.items.length) {
        this.itemService.getItemList(outfit.items).subscribe((items: Item[]) => {
          if (items.length == outfitItemsLength) {
             outfit.items = items;
          } else {
            let removedItems = new Array(outfitItemsLength - items.length);
            outfit.items = items.concat(removedItems);
          }

        });
      }

      this.selectedOutfit = outfit;
    });
  }


  deleteItem() {
    if (confirm("Are you sure you want to delete this outfit?")) {
      this.route.params.pipe(
        switchMap(params => this.outfitService.deleteOutfit(params.id))
      ).subscribe(res => {
        this.router.navigateByUrl('/dashboard/outfits', {state: {'outfitDeleted': true}});
      });
    }
  }

  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }
}
