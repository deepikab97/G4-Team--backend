import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  today=new Date();
  tomorrow=new Date();
  registerForm: FormGroup;
  submitted = false;
  primary: string;
  secondary: string;
  contacts: string[] = [];
  fieldTextType: boolean;

  constructor(private userService: UserService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  //only number will be add



  ngOnInit() {
    // this.today=this.today.setDate(this.today.getDate-18)
    this.today.setFullYear((this.today.getFullYear()-12))
    this.tomorrow.setFullYear((this.tomorrow.getFullYear()-50))
    console.log(this.today);

    console.log(this.tomorrow);
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      primary: ['', [Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      secondary: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {

      return;
    }
    else {
      this.submitted = false;
      this.register();
    }
  }

  register() {

    this.contacts.push(this.registerForm.value.primary);

    this.contacts.push(this.registerForm.value.secondary);

    console.log(this.contacts);

    let registerData: User = this.registerForm.value;

    registerData.contacts = this.contacts;
    console.log(registerData);

    if (this.auth.isAdmin()) {
      registerData.role = "MANAGER";
    }

    this.userService.registerUser(registerData).subscribe((res: any) => {

      if (this.auth.isAdmin()) {
        debugger
        this.router.navigate(['admin/view-managers'])
      } else {
        this.router.navigate(['login'])
      }
    });
  }
}
