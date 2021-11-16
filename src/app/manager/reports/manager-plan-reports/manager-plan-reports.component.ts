import { Component, OnInit, ViewChild } from '@angular/core';
//import { Label } from 'ng2-charts';

import { ChartOptions, ChartType } from 'chart.js';



import { ManagerPlan } from 'src/app/manager-plan';
import { ManagerService } from 'src/app/shared/manager.service';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, ThemeService } from 'ng2-charts';
import { PlanChart } from './plan-chart';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-manager-plan-reports',
  templateUrl: './manager-plan-reports.component.html',
  styleUrls: ['./manager-plan-reports.component.scss']
})
export class ManagerPlanReportsComponent implements OnInit {

  planReports: ManagerPlan[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public displayedColumns = ['planName', 'sportName', 'enrollmentCount', 'active'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  chart: PlanChart[];
  temp: number[] = [];
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // public pieChartColor:Colors[]=[];
  constructor(private planReport: ManagerService, private themeService: ThemeService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  managerId: number;
  ngOnInit() {


    this.managerId = parseInt(sessionStorage.getItem('userid'))
    let report = this.planReport.planReports(this.managerId);
    report.subscribe((results) => {
      this.planReports = results.content;
      this.dataSource.data = results.content as any[];
      this.chart = results.content;
      console.log(this.planReports);
      console.log(this.chart[0].enrollmentCount);
      for (var v of this.chart) {
        this.temp.push(v.enrollmentCount)
        console.log(v.enrollmentCount)
        this.pieChartLabels.push(v.planName)
      }
      this.pieChartData = this.temp
      console.log(this.pieChartData)

    })
  }
}


