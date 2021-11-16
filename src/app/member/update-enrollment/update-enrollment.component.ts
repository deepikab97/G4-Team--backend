import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/shared/member.service';
import { Enrollment } from 'src/app/models/enrollment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-enrollment',
  templateUrl: './update-enrollment.component.html',
  styleUrls: ['./update-enrollment.component.scss']
})
export class UpdateEnrollmentComponent implements OnInit {
  today = new Date();
  tomorrow =new Date();
  
  id:number;
  enrollment:Enrollment;
  batches:any[];
  planId:number;
  message:String;
  public isVisible:boolean=false;
  constructor(private route: ActivatedRoute,private router: Router,
    private memberService: MemberService) { }

    

  ngOnInit() {
    this.tomorrow.setDate(this.tomorrow.getDate()+30);
    this.enrollment = new Enrollment();
    this.id = this.route.snapshot.params['id'];
    this.memberService.findEnrollment(this.id).subscribe(
      data=>{
        console.log(data);
        this.enrollment=data;
        this.planId=this.enrollment.planId;
        this.viewBatches();
      },
      error=>{
        console.log(error);
      }
    )

  }

  viewBatches(){
     
    this.memberService.getbatches(this.planId).subscribe(
      data=>{
        console.log(data)
        this.batches=data;
      },
      error=>{
        console.log(error)
      }
    )

  }


  onSubmit(){
  
    this.updateEnrollment();

  
  }

  updateEnrollment(){
    this.enrollment.userId=parseInt(sessionStorage.getItem("userid"));
    console.log(this.enrollment);
    this.memberService.updateEnrollment(this.enrollment).subscribe(
      data=>{
        console.log(data);
        this.message=data;
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)

      },
    
     
      error=>{
        console.log(error)
      }
    )

  }

 


}
