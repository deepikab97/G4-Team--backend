import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/shared/manager.service';
import { Enrollment } from 'src/app/models/enrollment';
import { log } from 'util';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-enrollment-requests',
  templateUrl: './enrollment-requests.component.html',
  styleUrls: ['./enrollment-requests.component.scss']
})
export class EnrollmentRequestsComponent implements OnInit {

  
  message:string;
  enrollments:Enrollment[];
  public isVisible: boolean = false;

  public length:number;
  
   
 



  public displayedColumns = ['startDate','availability','startTime', 'endTime', 'planSportName', 'userFirstName','status','action'];
 public dataSource = new MatTableDataSource<Enrollment>();

 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
   constructor(private service: ManagerService) { }

  ngOnInit() {
    
    this.listEnrollments();
    
  }



  // to get list of enrollments
   listEnrollments(){
     this.service.getEnrollmentRequests().subscribe(data=>{
       this.enrollments=data
       this.length=this.enrollments.length
       this.dataSource.data = data as Enrollment[];
       console.log(data)
     })
   }


   //to update enrollment requests according to availibility and request type
   updateEnrollment(enrollmentRecord){
    let enrollment:Enrollment= new Enrollment();
    //for all requests having status as pending or waiting
     if(enrollmentRecord.status==='PENDING' || enrollmentRecord.status==='WAITING'){
      //check seats availibility
       if(enrollmentRecord.availability>0){
         //set status accordingly
         enrollment.status='APPROVED'
       }else{
     // check if status is Pending and manager moved the request to waiting queue
         if(enrollmentRecord.status==='PENDING'){
           enrollment.status='WAITING'
          
         }else{
           enrollment.status='WAITING'
         }
       }
     }
   //get manager from session who is logged in 
    enrollment.managerId=parseInt(sessionStorage.getItem('userid'))
     //hit back end to process reqest via service
    this.service.updateEnrollmentStatus(enrollmentRecord.id,enrollment).subscribe((response=>{
      this.message=response;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
     //load the list again after method execution
      this.ngOnInit();
    }))
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }

 //Mat-Table Filter
 applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
}
