
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerService } from 'src/app/shared/manager.service';
import {MatTableDataSource} from '@angular/material/table';
import { Batch } from 'src/app/models/batch';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-batches',
  templateUrl: './view-batches.component.html',
  styleUrls: ['./view-batches.component.scss']
})
export class ViewBatchesComponent implements OnInit {

 
 // batches: Observable<any[]> = [];
 batches:any=[];
 message:String;
 public isVisible: boolean = false;
 public displayedColumns = ['sportName', 'startTime', 'endTime', 'size','action'];
 public dataSource = new MatTableDataSource<Batch>();

 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(private managerService: ManagerService,
    private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getBatches();
    
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //Batch List
  getBatches(){
    this.managerService.getBatches().subscribe(
      data=>{
        console.log(data);
        this.batches=data.content;
        this.dataSource.data = data.content as Batch[];
      },
      error=>{  console.log(error);
      }
    )

  }
 
  //Disable Batch
  disableBatch(id: number,value:any){
    this.managerService.disableBatch(id).subscribe(
     data=>{
       console.log(data);
       this.message=data;
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)
       this.ngOnInit();
     },
     error=>{console.log(error);}
    )
  }

  //Enable Batch
  enableBatch(id: number){
    this.managerService.enableBatch(id).subscribe(
      data=>{
        console.log(data);
        this.message=data;
        if (this.isVisible) { 
          return;
        } 
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)
       
        this.ngOnInit();
      },
      error=>{
        console.log(error);
      }
    )
    
  }


  //Update Batch Navigation

  updateBatch(id: number){
    this.router.navigate(['../update-batch',id],{relativeTo:this.route});
  }

  //Mat-Table Filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
