import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deccan-sports-club';

  userrole: Observable<String>;
  username: Observable<String>;
  constructor(private as: AuthenticationService, private router: Router) {
    
  }
  logout() {
    this.as.logout();
    this.router.navigate(["login"]);
  }
  ngOnInit() {
    this.userrole = this.as.userrole;
    this.username = this.as.username;
  }
}
