import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  username: string
  userid:any;
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    this.userid=sessionStorage.getItem('userid');
    console.log(this.userid);
    
  }
}
