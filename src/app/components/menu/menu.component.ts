import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    protected authService: AuthService
  ) {
    authService.isAdmin$.subscribe((value) => {
    	console.log('admin', value);
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then(() => {
      window.location.reload();
    });
  }

}
