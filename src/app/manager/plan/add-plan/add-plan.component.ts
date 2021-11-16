import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/manager.service';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {
  id:number;
  sports:any=[];
  message:String;
  plan: Plan =new Plan();
  public isVisible: boolean = false;
  planForm:FormGroup;
  submitted=false;


  constructor(private managerService:ManagerService,
    private userService:UserService,
    private router :Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.planForm = this.formBuilder.group({

      sportId: ['',Validators.required],
      planName: ['',Validators.required],
      amount: ['',[Validators.required,Validators.min(500),Validators.max(50000)]],
      duration: ['',[Validators.required,Validators.min(30),Validators.max(90)]],


    });



    this.userService.getActiveSports().subscribe(
      data=>{
        console.log(data);
        this.sports=data;
      },
      error=>{console.log(error);}
    )
  }

  get f() { return this.planForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.planForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.addPlan();
    
   }
     
  }



  addPlan(){
    this.plan.managerId=parseInt(sessionStorage.getItem("userid"));
    console.log(this.plan);
    this.managerService.addPlan(this.plan).subscribe((data:any)=>{
      console.log(data);
      this.message=data;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
     
     
        
     // this.router.navigate(['../view-plans'],{relativeTo:this.route});
    },
    
      error=>{
        console.log(error)
      })
  }
 



  
}
