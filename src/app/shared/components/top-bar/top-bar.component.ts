import { Component, OnInit } from '@angular/core';

import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public isLogged:boolean;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.isLogged = this.userService.isLoggedIn();
  }

}
