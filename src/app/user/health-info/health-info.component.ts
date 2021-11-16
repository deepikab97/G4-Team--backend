
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Observable,Subscription, interval  } from 'rxjs';
import { Healthinfo } from 'src/app/models/healthinfo';

@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss']
})
export class HealthInfoComponent implements OnInit {

  healthInfo: any=null;
  id:number;
  isShownForAdd: boolean = false ;
  isShownForUpdate: boolean = false ;
  displayForAdd: boolean=false;
  displayForUpdate: boolean=false;
  message:String;
  status:String;
  bmi:number
  private updateSubscription: Subscription;
  constructor(private service:UserService,private router:Router ) { }

  ngOnInit() {
   
    //this.updateSubscription = interval(3000).subscribe(
     // (_val) => { this.getHealthInfo()});
 
      this.getHealthInfo()
     }
  


  getHealthInfo(){
    this.id=parseInt(sessionStorage.getItem("userid"));

    // console.log(this.id);
     this.service.getHealthInfoById(this.id).subscribe((result)=>
     {
       this.healthInfo=result;
       this.bmi=this.healthInfo.bmi;
       console.log("in healthInfo.ts")
       console.log(this.healthInfo);
       if(this.healthInfo.bmi < 18.5){
         this.status="Thinness";
       }
       else if (this.healthInfo.bmi < 25){
         this.status="Normal";
       }
       else if (this.healthInfo.bmi < 30){
         this.status="Overweight";
       }
       else{
         this.status="Obese";
       }
     },
     error=>console.log(error,this.healthInfo));
 
  }

  function_click(){
    if(this.healthInfo == null) {
      console.log("in click function")
      console.log(this.healthInfo)
       this.message="Sorry, No Health Record found. Please add health information!!!"
     console.log(this.message)
       this.isShownForAdd=true; 
      }
      else{
       this.message="Please update your health information for CURRENT** BMI"
        this.isShownForUpdate=true;
       
      }
  }

  onPressForAdd(){
    this.displayForAdd=true;
  }

  onPressForUpdate(){
    this.displayForUpdate=true;
  }

  
}
