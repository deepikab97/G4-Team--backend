import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/shared/admin.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,ThemeService } from 'ng2-charts';
import { BatchChart } from './batch-chart';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-admin-batch-reports',
  templateUrl: './admin-batch-reports.component.html',
  styleUrls: ['./admin-batch-reports.component.scss']
})
export class AdminBatchReportsComponent implements OnInit {

  batchReport:any;
  barChart:BatchChart[];
  temp:number[]=[];
  public displayedColumns = ['startTime', 'endTime', 'size', 'availability','sport','enrollment'];
  public dataSource = new MatTableDataSource<any>();
 
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private service:AdminService,private themeService:ThemeService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

   public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [1,1,1,1,1,1,1,1,1,1,1,1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public barChartOptions: ChartOptions = {
      responsive: true,
    };

  ngOnInit() {
      this.service.getBatchReport().subscribe((res:any)=>
      {
        this.batchReport = res.content;
        console.log(res);
        this.barChart=res.content;
        this.dataSource.data = res.content as any[];
        console.log(this.barChart);
        for(var v of this.barChart){
          this.temp.push(v.availability);
          this.pieChartLabels.push(v.startTime)


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

