import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"
import { Userrole } from '../models/userrole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http: HttpClient) {}

  loginStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  username = new BehaviorSubject<String>(sessionStorage.getItem("username"));
  userrole = new BehaviorSubject<String>(sessionStorage.getItem("userrole"));
  userid = new BehaviorSubject<String>(sessionStorage.getItem("userid"))
  firstname=new BehaviorSubject<String>(sessionStorage.getItem('firstname'))

  authenticate(username, password) {
    return this.http
      .post<any>("http://localhost:8132/auth/authenticate", {
        username,
        password,
      })
      .pipe(
        map((userData) => {
          
          
          sessionStorage.setItem("username", userData.username);
          sessionStorage.setItem("firstname",userData.firstName);
          sessionStorage.setItem("userrole", userData.roles);
          sessionStorage.setItem("token", "Bearer " + userData.token);
          sessionStorage.setItem("userid", userData.userId);
          sessionStorage.setItem("firstName", userData.firstName);
          //emit values so that subscriber will get updated value
          this.loginStatus.next(true);
          this.username.next(sessionStorage.getItem("username"));
          this.userrole.next(sessionStorage.getItem("userrole"));
          this.userid.next(sessionStorage.getItem("userid"));
          this.firstname.next(sessionStorage.getItem("firstname"));

          console.log(userData);
          return userData;
        })
      );
  }
 
  isUserLoggedIn() {
    let username = sessionStorage.getItem("username");
    return !(username === null);
  }
  isManager(){
    
    return this.getRole()==="ROLE_MANAGER";
  }
  isAdmin(){
    return this.getRole()==="ROLE_ADMIN";
  }

  isMember(){
    return this.getRole()==="ROLE_MEMBER";
  }
  getRole() {
    return sessionStorage.getItem("userrole");
  }
  getUsername() {
    return sessionStorage.getItem("username");
  }
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userrole");
    sessionStorage.removeItem("userid");
    //emit values
    this.loginStatus.next(false);
    this.username.next(null);
    this.userrole.next(null);
    this.userid.next(null);
  }
}