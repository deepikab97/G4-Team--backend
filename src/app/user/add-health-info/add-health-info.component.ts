import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Healthinfo } from 'src/app/models/healthinfo';
import { UserService } from 'src/app/shared/user.service';

interface BloodGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-health-info',
  templateUrl: './add-health-info.component.html',
  styleUrls: ['./add-health-info.component.scss']
})
export class AddHealthInfoComponent implements OnInit {
  bloodGroups: BloodGroup[] = [
    {value: 'A+', viewValue: 'A+'},
    {value: 'O+', viewValue: 'O+'},
    {value: 'B+', viewValue: 'B+'},
    {value: 'AB+', viewValue: 'AB+'},
    {value: 'A-', viewValue: 'A-'},
    {value: 'O-', viewValue: 'O-'},
    {value: 'B-', viewValue: 'B-'},
    {value: 'AB-', viewValue: 'AB-'}
   
  ];
    message:String;
    public isVisible: boolean = false;
    id:number;
    healthInfoForm: FormGroup;
    submitted=false;
    healthInfo: Healthinfo = new Healthinfo();

   constructor(
    private service:UserService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.healthInfoForm=this.formBuilder.group({
      height: ['',[Validators.required,Validators.min(60),Validators.max(244)]],
      weight: ['',[Validators.required,Validators.min(15),Validators.max(260)]],
      bloodGroup: ['',Validators.required],
    });
   
  }

  get f() { return this.healthInfoForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.healthInfoForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.addHealthInfo();
   } 
   }

   addHealthInfo(){
    this.id=parseInt(sessionStorage.getItem("userid"));
    console.log("in submit()")
    //console.log(healthInfoForm);
    //console.log(healthInfoForm.value);
    //this.healthInfo=healthInfoForm.value;
    this.service.addHealthInfo(this.id,this.healthInfo).subscribe(data=>
    {
      console.log(data);
      this.message=data.toString();
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.router.navigate(['../health-info'],{relativeTo:this.route});
      
    },
      
      error=>{
        console.log(error)
      }
    );
  }

}

