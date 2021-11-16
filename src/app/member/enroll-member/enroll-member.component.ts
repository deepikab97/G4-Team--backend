import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enrollment } from 'src/app/models/enrollment';
import { Plan } from 'src/app/models/plan';
import { MemberService } from 'src/app/shared/member.service';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enroll-member',
  templateUrl: './enroll-member.component.html',
  styleUrls: ['./enroll-member.component.scss']
})
export class EnrollMemberComponent implements OnInit {
  message:string;
  batches: any= [];
  planId: number;
  batchId:number;
  public isVisible: boolean = false;
  plan: Plan = new Plan();
  enrollment:Enrollment = new Enrollment();

  today = new Date();
  tomorrow =new Date();
  constructor(private service:MemberService,private userService:UserService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tomorrow.setDate(this.tomorrow.getDate()+30);
      this.planId = params['id'];
         
        this.service.getbatches(this.planId).subscribe((res:any)=>
    {
      this.batches = res;
      console.log(res);
    },
      error=>console.log(error));

      
    });

    this.userService.getPlan(this.planId).subscribe((result:any)=>
    {
      this.plan = result;
      this.enrollment.planId=this.plan.id;
      this.enrollment.planName=this.plan.planName;
      this.enrollment.amountPaid=this.plan.amount
      console.log(result);
    },
      error=>console.log(error));

  

  }

//add new plan/offer
onSubmit() {
  this.enrollment.userId=parseInt(sessionStorage.getItem("userid"))
  
  console.log(this.enrollment);
  this.service.enrollMember(this.enrollment).subscribe(data=>
  {
    this.message=data
    console.log(data);
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
    
  },
    error=>console.log(error));
    //this.router.navigate(['../../view-plans' ], { relativeTo: this.route });
}
}
