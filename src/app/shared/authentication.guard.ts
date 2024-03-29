import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  isUserLoggedIn:boolean
role:any
constructor(private router:Router,private service:AuthenticationService)
{

}
  
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
this.isUserLoggedIn = this.service.isUserLoggedIn()
this.role = this.service.getRole()
      
console.log(this.role);
    if(this.isUserLoggedIn)
    {
      if(next.data.role === this.role)
      {
        return true
      }
      else
      {
        this.router.navigate(['login'])
        return false;
      }
        
    }
    else
    {
      this.router.navigate(['login'])
      return false;
    }

  }
  
}
