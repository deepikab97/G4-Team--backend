import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-unlock-requests',
  templateUrl: './unlock-requests.component.html',
  styleUrls: ['./unlock-requests.component.scss']
})
export class UnlockRequestsComponent implements OnInit {
  message:string;
  unlockrequests: any= [];
  userId: number;
  public isVisible: boolean = false;
  public length:number 

  public displayedColumns = ['firstName', 'lastName', 'email', 'lockDate', 'action'];
  public dataSource = new MatTableDataSource<any>();
 
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private service:AdminService,private router: ActivatedRoute) { }

  ngOnInit() {
        this.getUnlockRequest();
  }

  getUnlockRequest(){
    this.service.getUnlockRequest().subscribe((res:any)=>
    {
      this.unlockrequests = res.content;
      this.dataSource.data = res.content as any[];
      console.log(res);
    },
      error=>console.log(error));
  }

  unlockAccount(userId) {

    console.log(userId);
    this.service.unlockAccount(userId).subscribe((res:any)=> {
      console.log(res);
      this.message=res;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
    });
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
