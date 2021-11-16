import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewSportsComponent } from './sport/view-sports/view-sports.component';
import { AddSportComponent } from './sport/add-sport/add-sport.component';
import { ViewManagersComponent } from './manager/view-managers/view-managers.component';
import { UnlockRequestsComponent } from './unlock-requests/unlock-requests.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminBatchReportsComponent } from './reports/admin-batch-reports/admin-batch-reports.component';
import { AdminPlanReportsComponent } from './reports/admin-plan-reports/admin-plan-reports.component';
import { AdminSportReportsComponent } from './reports/admin-sport-reports/admin-sport-reports.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import {ChartsModule,ThemeService} from  'ng2-charts'
import {MatTableModule} from '@angular/material/table';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import {MatSidenavModule} from '@angular/material/sidenav';

import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [AdminHomeComponent, ViewSportsComponent, AddSportComponent, ViewManagersComponent, UnlockRequestsComponent,SideNavComponent, AdminHeaderComponent, AdminBatchReportsComponent, AdminPlanReportsComponent, AdminSportReportsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
  ],

  providers:[MatButtonModule,
    MatIconModule,ThemeService
  ],
  exports:[AdminHomeComponent]
})
export class AdminModule { }
