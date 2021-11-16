import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ViewBatchesComponent } from './manager/batch/view-batches/view-batches.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { MemberHomeComponent } from './member/member-home/member-home.component';
import { Userrole } from './models/userrole';
import { AuthenticationGuard } from './shared/authentication.guard';
import { LoginComponent } from './user/login/login.component';
import { ViewEnrollmentsComponent } from './member/view-enrollments/view-enrollments.component';
import { ViewReceiptComponent } from './member/view-receipt/view-receipt.component';
import { EnrollMemberComponent } from './member/enroll-member/enroll-member.component';
import { AddBatchComponent } from './manager/batch/add-batch/add-batch.component';
import { UpdateBatchComponent } from './manager/batch/update-batch/update-batch.component';
import { AddPlanComponent } from './manager/plan/add-plan/add-plan.component';
import { ViewPlansComponent } from './manager/plan/view-plans/view-plans.component';
import { UpdatePlanComponent } from './manager/plan/update-plan/update-plan.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { EnrollmentRequestsComponent } from './manager/enrollment/enrollment-requests/enrollment-requests.component';
import { ViewManagersComponent } from './admin/manager/view-managers/view-managers.component';
import { RegisterComponent } from './user/register/register.component';
import { AddSportComponent } from './admin/sport/add-sport/add-sport.component';
import { ViewSportsComponent } from './admin/sport/view-sports/view-sports.component';
import { UnlockRequestsComponent } from './admin/unlock-requests/unlock-requests.component';
import { AdminBatchReportsComponent } from './admin/reports/admin-batch-reports/admin-batch-reports.component';
import { AdminPlanReportsComponent } from './admin/reports/admin-plan-reports/admin-plan-reports.component';
import { AdminSportReportsComponent } from './admin/reports/admin-sport-reports/admin-sport-reports.component';
import { ManagerBatchReportsComponent } from './manager/reports/manager-batch-reports/manager-batch-reports.component';
import { ManagerPlanReportsComponent } from './manager/reports/manager-plan-reports/manager-plan-reports.component';
import { ManagerEnrollmentReportsComponent } from './manager/reports/manager-enrollment-reports/manager-enrollment-reports.component';
import { ViewCommentsComponent } from './member/feedback/view-comments/view-comments.component';

import { CompletedEnrollmentComponent } from './member/feedback/completed-enrollment/completed-enrollment.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { HealthInfoComponent } from './user/health-info/health-info.component';
import { ViewPlansMemberComponent } from './member/view-plans-member/view-plans-member.component';

import { AddHealthInfoComponent } from './user/add-health-info/add-health-info.component';
import { UpdateHealthInfoComponent } from './user/update-health-info/update-health-info.component';

import { UpdateEnrollmentComponent } from './member/update-enrollment/update-enrollment.component';
import { MemberCommentComponent } from './member/feedback/member-comment/member-comment.component';
import { AddCommentComponent } from './member/feedback/add-comment/add-comment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent },
  
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent },
  {path:'forgot-password',component:ForgotPasswordComponent },
  {path:'aboutus',component:AboutUsComponent },
  {
    path: 'admin', component: AdminHomeComponent, canActivate: [AuthenticationGuard], data: { role: Userrole[0] },
    children: [
      { path: '', component: UnlockRequestsComponent},
      { path: 'add-manager', component: RegisterComponent },
      { path: 'view-managers', component: ViewManagersComponent },
      { path: 'add-sport', component: AddSportComponent },
      { path: 'view-sports', component: ViewSportsComponent },
      { path: 'unlock-request', component: UnlockRequestsComponent },
      { path: 'batch-report', component: AdminBatchReportsComponent },
      { path: 'plan-report', component: AdminPlanReportsComponent },
      { path: 'sport-report', component: AdminSportReportsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'health-info', component: HealthInfoComponent }
    ]
  },

  {
    path: 'manager', component: ManagerHomeComponent, canActivate: [AuthenticationGuard], data: { role: Userrole[1] },
    children: [
      { path: '', component: EnrollmentRequestsComponent  },
      { path: 'add-batch', component: AddBatchComponent },
      { path: 'view-batches', component: ViewBatchesComponent },
      { path: 'update-batch/:id', component: UpdateBatchComponent},
      { path: 'add-plan', component: AddPlanComponent },
      { path: 'view-plans', component: ViewPlansComponent },
      { path: 'update-plan/:id', component: UpdatePlanComponent },
      { path: 'batch-report', component: ManagerBatchReportsComponent},
      { path: 'plan-report', component: ManagerPlanReportsComponent },
      { path: 'enrollment-report', component: ManagerEnrollmentReportsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'enrollment-request', component: EnrollmentRequestsComponent },
      { path: 'enrollment-request/:id', component: EnrollmentRequestsComponent },
      { path: 'health-info', component: HealthInfoComponent }


    ]
  },

  {
    path: 'member', component: MemberHomeComponent, canActivate: [AuthenticationGuard], data: { role: Userrole[2] },
    children: [
      { path: '', component: ViewPlansMemberComponent },
      { path: 'enrollment', component: ViewEnrollmentsComponent },
      { path: 'enrollment/view-receipt/:id', component: ViewReceiptComponent },
      { path: 'enroll-member/:id', component: EnrollMemberComponent },
      {path:'view-comments/:id',component:ViewCommentsComponent },
      {path:'add-comment/:id',component:AddCommentComponent},
      { path: 'update-enrollment/:id', component: UpdateEnrollmentComponent},
      {path:'member-comment/:id',component:MemberCommentComponent },
      {path:'feedback',component:CompletedEnrollmentComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'health-info', component: HealthInfoComponent },
      { path: 'add-health-info', component: AddHealthInfoComponent },
      { path: 'update-health-info', component: UpdateHealthInfoComponent },
      { path: 'view-plans', component: ViewPlansMemberComponent }
    ]
  },
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
