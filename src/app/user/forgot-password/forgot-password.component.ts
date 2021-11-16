import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/models/forgot-password';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Changepassword } from 'src/app/models/changepassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnChanges {


  flag: Number = 0;
  email: string = "";
  isReadable: boolean = true;
  otp: string = "";
  checkPassword: boolean;
  submitted = false;
  resetPasswordForm: FormGroup;
  setPassword: Changepassword = new Changepassword();

  constructor(private service: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnChanges(): void {
    console.log(this.email);

  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8), Validators.pattern]],
      confirmPassword: ['', Validators.required],
    })
  }

  get r() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    } else {
      this.submitted = false;
      this.resetPassword();
    }
  }

  generateOtp(formData) {

    let forgotPassword: ForgotPassword = formData.value;
    forgotPassword.otp = ''
    this.service.generateOtp(forgotPassword).subscribe((data: any) => {
      if (data === "Otp sent to email id") {
        this.isReadable = false;
      }
    });
  }
  validateOtp(validateOtpForm) {
    let forgotPassword: ForgotPassword = validateOtpForm.value;;
    forgotPassword.email = this.email;

    this.service.validateOtp(forgotPassword).subscribe((data: any) => {
      if (data === "Otp is verified") {
        this.flag = 1;
      }
    });
  }

  resetPassword() {
    let forgotPassword: ForgotPassword;
    forgotPassword = { password: this.setPassword.newPassword, email: this.email, otp: '' };
    console.log(forgotPassword);

    this.service.passwordReset(forgotPassword).subscribe((data: any) => {
      if (data === "Password changed successfully") {
        this.router.navigate(['/login'])
      }
    });
  }

  check(event: any) {

    if (this.setPassword.newPassword != this.setPassword.confirmPassword) {

      this.checkPassword = true;
    }
    else {
      this.checkPassword = false;
    }

  }

}

