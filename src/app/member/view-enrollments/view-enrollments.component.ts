import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Enrollment } from 'src/app/models/enrollment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-enrollments',
  templateUrl: './view-enrollments.component.html',
  styleUrls: ['./view-enrollments.component.scss']
})
export class ViewEnrollmentsComponent implements OnInit {

  enrollments:any[];
  id:number;


  public displayedColumns = [ 'planName','planSportName', 'startTime', 'startDate','status','action'];
 public dataSource = new MatTableDataSource<Enrollment>();

 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private memberService:MemberService,
    private router:Router,
    private route:ActivatedRoute) { }


  ngOnInit() {

    this.memberEnrollment();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }

  memberEnrollment(){
    this.id=parseInt(sessionStorage.getItem("userid"));
    this.memberService.memberEnrollments(this.id).subscribe(
      data=>{
        console.log(data)
        this.dataSource.data=data.content as Enrollment[]
      },
      error=>{
        console.log(error)
      }
    )
  }

  selectBatch(id:number){
    this.router.navigate(['../update-enrollment',id],{relativeTo:this.route});
  }

  renew(planId:number){
    this.router.navigate(['../enroll-member',planId],{relativeTo:this.route})
  }


   //Mat-Table Filter
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 //view receipt for plans
 viewReceipt(id: number){
  this.router.navigate(['./view-receipt/',id ], { relativeTo: this.route });
}


}
