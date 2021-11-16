import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerService } from 'src/app/shared/manager.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,ThemeService } from 'ng2-charts';
import { BatchChart } from './batch-chart';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Batch } from 'src/app/models/batch';
@Component({
  selector: 'app-manager-batch-reports',
  templateUrl: './manager-batch-reports.component.html',
  styleUrls: ['./manager-batch-reports.component.scss']
})
export class ManagerBatchReportsComponent implements OnInit {

  reportBatch:any[]
  managerId:number
  barChart:BatchChart[];
  temp:number[]=[];
  public displayedColumns = ['availability','endTime','enrollment','size','sport','startTime'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
    constructor(private batchReport:ManagerService,private themeService:ThemeService) { 
      monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    }

    public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [1,1,1,1,1,1,1,1,1,1,1,1,1];
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
      this.managerId=parseInt(sessionStorage.getItem('userid'))
      let report=this.batchReport.batchReportsForManager(this.managerId);
      report.subscribe((results)=>{
        this.reportBatch=results.content;
        this.barChart=results.content;
        this.dataSource.data = results.content as any[];
        console.log(this.dataSource.data)
      
        for(var v of this.barChart){
          this.temp.push(v.availability);
          this.pieChartLabels.push(v.startTime)

        }
        this.pieChartData=this.temp
      console.log(this.pieChartData)
        
      })
    }
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   }
    //table filter  mat
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  


}
