import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { UserService } from 'src/app/shared/user.service';
import { ForgotPassword } from 'src/app/models/forgot-password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  invalidLogin = false
  message = null
  flag:number=0;
  isReadable: boolean=true;
  unlockAccount: boolean=false;
  constructor(private service: AuthenticationService, private userService:UserService, private router: Router) { }

  ngOnInit() {
  }

  Login(data) {

    this.email = data.form.value.email;
    this.password = data.form.value.password;
    this.service.authenticate(this.email, this.password).subscribe(
      (data: any) => {

        if (data.roles[0] === 'ROLE_MEMBER') {
          this.router.navigate(['member'])
        }
        if (data.roles[0] === 'ROLE_ADMIN') {
          this.router.navigate(['admin'])
        }
        if (data.roles[0] === 'ROLE_MANAGER') {
          this.router.navigate(['manager'])
        }
        this.invalidLogin = false
      },
      error => {
        if (error.error.details[0] === 'Account is locked') {
          this.message = 'Account is locked, contact admin to unlock account';
          this.flag=1;
          this.isReadable=false;
          this.invalidLogin = true
        }
        else {
          this.message = 'Invalid email or password'
          this.invalidLogin = true
        }
      })
  }

  showUnlockBtn(){
    this.unlockAccount=true;
    
  }

  generateOtp(formData) {

    let unlockRequest: ForgotPassword = formData.value;
    unlockRequest.otp = ''
    this.userService.unlockAccountRequest(unlockRequest).subscribe((data: any) => {
      if (data === "Otp sent to email id") {
        this.isReadable = false;
      }
    });
  }
  validateOtp(validateOtpForm) {
    let unlockAccount: ForgotPassword = validateOtpForm.value;;
    unlockAccount.email = this.email;

    this.userService.unlockAccount(unlockAccount).subscribe((data: any) => {
      if (data === "Account unlocked") {
        
        this.flag=0;
        this.message="Your Account is unlocked "
       
      }
    });
  }

}
