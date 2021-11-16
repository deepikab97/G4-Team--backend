import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.scss']
})
export class MemberHeaderComponent implements OnInit {

 userName:string
  constructor(private app:AppComponent) { }

  ngOnInit() {
    this.userName=sessionStorage.getItem('firstName')
  }

}
