import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberHomeComponent } from './member-home/member-home.component';
import { EnrollMemberComponent } from './enroll-member/enroll-member.component';
import { ViewEnrollmentsComponent } from './view-enrollments/view-enrollments.component';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { MemberHeaderComponent } from './member-header/member-header.component';
import { ViewCommentsComponent } from './feedback/view-comments/view-comments.component';
import { CompletedEnrollmentComponent } from './feedback/completed-enrollment/completed-enrollment.component';
import { UserModule } from '../user/user.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { ViewPlansMemberComponent } from './view-plans-member/view-plans-member.component';
import { MatTableModule, MatFormFieldModule, MatInputModule} from '@angular/material'
import {MatPaginatorModule } from '@angular/material/paginator';  
import { MatSortModule } from '@angular/material/sort';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

import { UpdateEnrollmentComponent } from './update-enrollment/update-enrollment.component';
import { MemberCommentComponent } from './feedback/member-comment/member-comment.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import { AddCommentComponent } from './feedback/add-comment/add-comment.component';
PdfMakeWrapper.setFonts(pdfFonts)
@NgModule({
  declarations: [MemberHomeComponent, EnrollMemberComponent, ViewEnrollmentsComponent, ViewReceiptComponent, MemberHeaderComponent, ViewCommentsComponent, MemberCommentComponent, CompletedEnrollmentComponent, ViewPlansMemberComponent, UpdateEnrollmentComponent, AddCommentComponent],
  imports: [

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    UserModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
  ],
  exports:[MemberHeaderComponent],
})
export class MemberModule { }