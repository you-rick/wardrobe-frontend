import {Component, OnInit, OnDestroy} from '@angular/core';
import {ItemService} from "../../../../shared/services/item.service";
import {ToastService} from "../../../../shared/services/toast.service";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  public envPath = environment.API_URL;
  public itemsList;

  constructor(
    private itemService: ItemService,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.fetchLaundry();
  }

  fetchLaundry() {
    this.itemService.getLaundryList().subscribe(res => {
      this.itemsList = res;
      console.log(res);
    });
  }

  clearLaundry() {
    if (this.itemsList) {
      this.itemService.updateLaundryList(false).subscribe(res => {
        this.itemsList = null;
        this.toastService.show('Laundry successfully!', {classname: 'bg-success text-light'});
      });
    }
  }


  ngOnDestroy() {
    this.toastService.remove(this.toastService.toasts[0]);
  }

}
