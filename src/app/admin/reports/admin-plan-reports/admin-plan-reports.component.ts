import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,ThemeService } from 'ng2-charts';
import { PlanChart } from './plan-chart';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-plan-reports',
  templateUrl: './admin-plan-reports.component.html',
  styleUrls: ['./admin-plan-reports.component.scss']
})
export class AdminPlanReportsComponent implements OnInit {

  planReport:any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  chart:PlanChart[];
  temp:number[]=[];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [1,1,1,1,1,1,1,1,1,1,1,1,1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public displayedColumns = ['planName', 'sportName', 'enrollmentCount'];
  public dataSource = new MatTableDataSource<any>();
 
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private service:AdminService,private themeService:ThemeService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.service.getPlanReport().subscribe((res:any)=>
    {
      this.planReport = res.content;
      console.log(res);
      this.dataSource.data = res.content as any[];
      this.chart=res.content;
      console.log(this.chart[0].enrollmentCount);
      for(var v of this.chart){
        this.temp.push(v.enrollmentCount)
        console.log(v.enrollmentCount)
        this.pieChartLabels.push(v.planName)
      }
      this.pieChartData=this.temp
      console.log(this.pieChartData)

    },
      error=>console.log(error));
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
