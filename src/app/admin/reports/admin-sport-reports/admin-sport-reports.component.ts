import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,ThemeService } from 'ng2-charts';
import { SportChart } from './sport-chart';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-sport-reports',
  templateUrl: './admin-sport-reports.component.html',
  styleUrls: ['./admin-sport-reports.component.scss']
})
export class AdminSportReportsComponent implements OnInit {

  sportReport: any= [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  chart:SportChart[];
  temp:number[]=[];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [1,1,1,1,1,1,1,1,1,1,1,1,1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public displayedColumns = ['sportName', 'planCount', 'batchCount', 'enrollmentCount'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private service:AdminService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit() {
        this.service.getSportReport().subscribe((res:any)=>
    {
      this.sportReport = res.content;
      this.dataSource.data = res.content as any[];
      console.log(res);
      this.chart=res.content;
      console.log(this.chart[0].batchCount);
      for(var v of this.chart){
        this.temp.push(v.batchCount)
        console.log(v.batchCount)
        this.pieChartLabels.push(v.sportName)
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
