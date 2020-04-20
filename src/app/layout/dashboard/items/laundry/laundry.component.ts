import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../../../shared/services/item.service";
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  public envPath = environment.API_URL;
  public itemsList;

  constructor(private itemService: ItemService) {

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

}
