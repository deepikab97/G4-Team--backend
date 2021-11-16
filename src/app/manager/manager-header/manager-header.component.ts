import { Component, OnInit } from '@angular/core';

import { AppComponent } from 'src/app/app.component';

import { ManagerHomeComponent } from '../manager-home/manager-home.component';


@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.scss']
})
export class ManagerHeaderComponent implements OnInit {

  userName:string
  constructor(private app:AppComponent,private component:ManagerHomeComponent) { }

  ngOnInit() {
    this.userName=sessionStorage.getItem('firstName')
  }

}
