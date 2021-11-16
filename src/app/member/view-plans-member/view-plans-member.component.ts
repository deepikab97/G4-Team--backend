import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Plan } from 'src/app/models/plan';

@Component({
  selector: 'app-view-plans-member',
  templateUrl: './view-plans-member.component.html',
  styleUrls: ['./view-plans-member.component.scss']
})
export class ViewPlansMemberComponent implements OnInit {

  plans: any = [];
  plan:Observable<any>;
  id: number;
  planReview: Review;
  planName:string="";
  // public dataSource = new MatTableDataSource<Plan>();
  dataSource;
 
  @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private memberService: MemberService, private router: Router, private route: ActivatedRoute,private messageService:MessageService) { }

  ngOnInit() {
    this.id = parseInt(sessionStorage.getItem("userid"));

    console.log(this.id);
    this.memberService.getPlansForMember(this.id).subscribe((result: any) => {
      this.plans = result.content;
      this.dataSource = new MatTableDataSource<Plan>(this.plans);
      this.dataSource.paginator = this.paginator;
      this.plan = this.dataSource.connect();
      console.log(this.plans);
    },

      error => console.log(error));
      // this.messageService.currentMessage.subscribe(msg=>this.planName=msg);
  }


  buyPlan(planId: number){
    this.router.navigate(['../enroll-member/',planId ], { relativeTo: this.route });
  }

  likePlan(planId: number) {
    this.planReview = { planId: planId, comment: "" };
    this.memberService.likePlan(this.id, this.planReview).subscribe((data => {
      this.ngOnInit()
      })
    );
  }

  showComments(planId:number,planName:string){
    this.planName=planName
    this.messageService.changeMessage(this.planName);
    this.router.navigate(['../view-comments/', planId], { relativeTo: this.route });
  }

   //Mat-Table Filter
 applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
}
