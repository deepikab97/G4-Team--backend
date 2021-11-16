import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ManagerService } from 'src/app/shared/manager.service';

@Component({
  selector: 'app-manager-enrollment-reports',
  templateUrl: './manager-enrollment-reports.component.html',
  styleUrls: ['./manager-enrollment-reports.component.scss']
})
export class ManagerEnrollmentReportsComponent implements OnInit {
  
  reportEnrollment:any
  constructor(private enrollmentservice: ManagerService) { }
  managerId:Number
  public displayedColumns = ['planSportName','planName','startDate','endDate','status','userName'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  ngOnInit() {
    this.managerId=parseInt(sessionStorage.getItem("userid"));
    let enrollments=this.enrollmentservice.enrollmentReportsForManager(this.managerId);
    enrollments.subscribe((results)=>{
      this.reportEnrollment=results.content;
      this.dataSource.data = results.content as any[];
      console.log(this.reportEnrollment);
      
    })
  }
}
