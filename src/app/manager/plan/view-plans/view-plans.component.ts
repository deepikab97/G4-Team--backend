import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerService } from 'src/app/shared/manager.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Plan } from 'src/app/models/plan';



@Component({
  selector: 'app-view-plans',
  templateUrl: './view-plans.component.html',
  styleUrls: ['./view-plans.component.scss']
})
export class ViewPlansComponent implements OnInit {

  plans:any=[];
  message:String;
  public isVisible: boolean = false;

  public displayedColumns = [ 'planName', 'amount','duration','sportName','action'];
 public dataSource = new MatTableDataSource<Plan>();

 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private managerService:ManagerService,
   private router:Router, private route:ActivatedRoute) { }


  ngOnInit() {
    this.getPlans();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }
   
 //Plan list
  getPlans(){
   this.managerService.getPlans().subscribe((data:any)=>{
     console.log(data)
     this.plans=data.content;
     this.dataSource.data=data.content as Plan[];
   },
   error=>{  console.log(error);
   })

  }

  //Disable Plan
  disablePlan(id:number){
    console.log('inside viewplans.ts')
    this.managerService.disablePlan(id).subscribe((data:any)=>{
      console.log(data)
      this.message=data;
      console.log(this.message)
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
      },
      error=>{  console.log(error);
      })

  }


  //Enable Plan
  enablePlan(id:number){
    this.managerService.enablePlan(id).subscribe((data:any)=>{
      this.message=data;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
    },
    error=>{console.log(error);
    }
    )
  }



  //Update Plan Navigation
  updatePlan(id:number){
    this.router.navigate(['../update-plan',id],{relativeTo:this.route});
  }

  
  
  //Mat-Table Filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
