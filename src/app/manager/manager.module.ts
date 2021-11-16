import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { AddBatchComponent } from './batch/add-batch/add-batch.component';
import { ViewBatchesComponent } from './batch/view-batches/view-batches.component';
import { UpdateBatchComponent } from './batch/update-batch/update-batch.component';
import { AddPlanComponent } from './plan/add-plan/add-plan.component';
import { ViewPlansComponent } from './plan/view-plans/view-plans.component';
import { UpdatePlanComponent } from './plan/update-plan/update-plan.component';
import { EnrollmentRequestsComponent } from './enrollment/enrollment-requests/enrollment-requests.component';

import { ManagerHeaderComponent } from './manager-header/manager-header.component';
import { UserModule } from '../user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ManagerBatchReportsComponent } from './reports/manager-batch-reports/manager-batch-reports.component';
import { ManagerPlanReportsComponent } from './reports/manager-plan-reports/manager-plan-reports.component';
import { ManagerEnrollmentReportsComponent } from './reports/manager-enrollment-reports/manager-enrollment-reports.component';

import { RouterModule } from '@angular/router';
import {ChartsModule,ThemeService} from  'ng2-charts'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../user/footer/footer.component';
//import { FooterComponent } from '../user/footer/footer.component';
import { MatTableModule, MatFormFieldModule, MatInputModule} from '@angular/material'
import {MatPaginatorModule } from '@angular/material/paginator';  
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [ManagerHomeComponent, AddBatchComponent, ViewBatchesComponent, UpdateBatchComponent, AddPlanComponent, ViewPlansComponent, UpdatePlanComponent, EnrollmentRequestsComponent, ManagerHeaderComponent, ManagerBatchReportsComponent, ManagerPlanReportsComponent, ManagerEnrollmentReportsComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers:[MatButtonModule,
    MatIconModule,ThemeService
    
  ],
 

})
export class ManagerModule { }
