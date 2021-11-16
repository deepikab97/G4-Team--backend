import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private as: AuthenticationService, private router: Router) { }
  userrole: string;
  ngOnInit() {
    this.userrole=this.as.getRole();
    console.log(this.userrole);
    
  }
  memberNavigate(){
    this.router.navigate(['member'])
  }

  managerNavigate(){
    this.router.navigate(['manager'])
  }

  adminNavigate(){
    this.router.navigate(['admin'])
  }
}
