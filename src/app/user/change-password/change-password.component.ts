import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Changepassword } from 'src/app/models/changepassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  id: number;
  message: String;
  checkPassword: any;


  public isVisible: boolean = false;
  changepassForm: FormGroup;
  submitted=false;
  changepassword : Changepassword = new Changepassword();

  constructor(private userService: UserService,
     private router: Router,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changepassForm= this.formBuilder.group({
      oldPassword: ['',Validators.required],
      newPassword: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8),Validators.pattern]],
      confirmPassword: ['',Validators.required],
    });
  }

  get f() { return this.changepassForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.changepassForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.changePassword();
   } 
   }

changePassword(){
  this.id = parseInt(sessionStorage.getItem("userid"));
    console.log(this.id);
    this.userService.changePassword(this.id, this.changepassword)
    .subscribe((data: any) => {
      
      this.message = data;

      console.log(data);
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
     
     }, error=>{console.log(error);
        

    
    })
}


check() {
 
    if (this.changepassword.newPassword!= this.changepassword.confirmPassword) {
     
      this.checkPassword = true;
    }
    else {
      this.checkPassword = false;
    }

  }
}