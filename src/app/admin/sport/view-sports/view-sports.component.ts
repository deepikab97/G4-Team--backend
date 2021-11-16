import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Batch } from 'src/app/models/batch';
import { AdminService } from 'src/app/shared/admin.service';
import { Sport } from '../add-sport/sport';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.scss']
})
export class ViewSportsComponent implements OnInit {
allsports:any=[];
public isVisible: boolean = false;
adminId:Number;
sport:Sport = new Sport();

public displayedColumns = ['id','sportName','active','action'];

 public dataSource = new MatTableDataSource<any>();

 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private adminService: AdminService,private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.adminId=parseInt(sessionStorage.getItem('userid'))
    this.getAllSports();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
 }
  getAllSports(){
    let result=this.adminService.viewSports();
    console.log(result);
    result.subscribe((allsport)=>{
      
      this.allsports=allsport.content;
      console.log(this.allsports);
      this.dataSource.data = allsport.content as any[];
      console.log(this.allsports);

    })
  }
  info:any;
  deleteSport(id:number){
    let result=this.adminService.deleteSport(id);
    result.subscribe((deletedsport)=>{
      this.info=deletedsport;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
      
    })

  }
  enableSport(id:number){
    let result=this.adminService.enableSport(id);
    result.subscribe((updatedsport)=>{
      this.info=updatedsport;
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
      this.ngOnInit();
     
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  addSport(){
   
  this.adminService.addSport(this.sport).subscribe((result)=>{
    this.info=result;
    if(result=="sport added successfully"){
      
   
    }
   else
  
    console.log(result);

    this.ngOnInit();
  }
  )
 
  }

  onSubmit(){
    this.addSport();
  }

}

