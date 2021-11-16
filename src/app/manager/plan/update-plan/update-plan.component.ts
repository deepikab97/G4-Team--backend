import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/shared/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.scss']
})
export class UpdatePlanComponent implements OnInit {

  message:string;
  plan: Plan =new Plan();
  id:number;
  public isVisible: boolean = false;
  planForm:FormGroup;
  submitted=false;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.planForm = this.formBuilder.group({
      planName: ['',Validators.required],
      amount: ['',[Validators.required,Validators.min(500),Validators.max(50000)]],
      duration: ['',[Validators.required,Validators.min(30),Validators.max(90)]],


    });


    this.id=this.route.snapshot.params['id'];
    this.managerService.findPlanById(this.id).subscribe((data:any)=>{
     
      this.plan=data;
      console.log(this.plan);
    },
     error=>{
        console.log(error);
      })

  }

  get f() { return this.planForm.controls; }

  onSubmit(){

    this.submitted=true;

    if (this.planForm.invalid) {
      
      return;
   }
   else{
    this.submitted=false;
    this.updatePlan();
    
   }
     
  }
  
   updatePlan(){
     this.managerService.updatePlanById(this.id,this.plan).subscribe((data:any)=>{
      console.log(data);
      this.message=data;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
     
     },
     
     error=>{
        console.log(error);
      })
    
   }

}
