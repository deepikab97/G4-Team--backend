import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewPlansMemberComponent } from '../../view-plans-member/view-plans-member.component';
import { MemberService } from 'src/app/shared/member.service';
import { Review } from 'src/app/models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-completed-enrollment',
  templateUrl: './completed-enrollment.component.html',
  styleUrls: ['./completed-enrollment.component.scss']
})
export class CompletedEnrollmentComponent implements OnInit {


  
  
  userid: number = parseInt(sessionStorage.getItem('userid'));
  comment:Review;
  planId:number;
  enrollments: any;
  planName:string="";
  memberComment
  constructor(private memberService: MemberService,private router: Router, private route: ActivatedRoute,private messageService:MessageService) {

  }

  ngOnInit() {
    // this.enrollments = this.getMemberEnrollments();
    this.getMemberEnrollments();
    
  }
  getMemberEnrollments() {
    this.memberService.getCompletedPlans(this.userid).subscribe(data=>{
      this.enrollments=data; 
      console.log(this.enrollments);
      
    })
  }

  commentOnPlan(planId:number,planName:string){
    this.planName=planName;
       
    this.messageService.changeMessage(this.planName);
    this.comment={planId:planId,comment:this.memberComment}
    console.log(planId);
    this.router.navigate(['../add-comment',planId],{ relativeTo: this.route });
    
   
  }

  viewMemberComment(planId:number,planName:string){
    this.planName=planName;
       
    this.messageService.changeMessage(this.planName);
    this.router.navigate(['../member-comment',planId],{ relativeTo: this.route });
  }
}
