import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Healthinfo } from 'src/app/models/healthinfo';
interface BloodGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-health-info',
  templateUrl: './update-health-info.component.html',
  styleUrls: ['./update-health-info.component.scss']
})
export class UpdateHealthInfoComponent implements OnInit {
  message:String;
    id:number;
    healthInfoForm: FormGroup;
    submitted=false;
    healthInfo: Healthinfo ;
    public isVisible: boolean = false;
   constructor(
    private service:UserService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  

  
  ngOnInit() {
    this.healthInfoForm=this.formBuilder.group({
      height: ['',[Validators.required,Validators.min(60),Validators.max(244)]],
      weight: ['',[Validators.required,Validators.min(15),Validators.max(260)]],
      bmi: ['',Validators.required],
      bloodGroup: ['',Validators.required],
    });

    this.healthInfo=new Healthinfo();
    this.id=parseInt(sessionStorage.getItem("userid"));
    this.service.getHealthInfoById(this.id).subscribe((result)=>
    {
      this.healthInfo=result;
     
    },
    error=>console.log(error,this.healthInfo));
  }


  get f() { return this.healthInfoForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.healthInfoForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.updateHealthInfo();
   } 
   }


  updateHealthInfo(){
      this.service.updateHealthInfo(this.id,this.healthInfo).subscribe((data)=>{
        console.log(data);
      this.message=data.toString();
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.router.navigate(['../health-info'],{relativeTo:this.route});
      })
  }

}
