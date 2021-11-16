import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  today = new Date();
  tomorrow =new Date();
  
  public isVisible: boolean = false;
 
  user: User = new User();
  id:number;
  message:String;
  userName
 
  profileForm:FormGroup;
  submitted=false;
 
  constructor(private service:UserService,
    private router:Router,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
   
    this.profileForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      birthDate: ['',Validators.required],
      gender:['',Validators.required],
       primaryContact:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
       secondaryContact:['',[Validators.maxLength(10),Validators.minLength(10)]],
   
    
    
    });




    this.id=parseInt(sessionStorage.getItem("userid"));
 this.userName=sessionStorage.getItem('firstName')
    console.log(this.id);
    this.service.getUserById(this.id).subscribe((data:any)=>
    {
      this.user=data;
       console.log(this.user);
    },
    
      error=>console.log(error));
  }


  get f() { return this.profileForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.profileForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.updateProfile();
    
   }
     
  }



  updateProfile(){
    console.log('inside updateprofile.ts')

    this.service.updateProfile(this.id,this.user).subscribe((data:any)=>{
    this.message=data;
    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
   
     }, error=>{console.log(error);
      
 
    })
   
  }

}
