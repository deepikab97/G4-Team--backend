import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthinterceptorService } from './shared/authinterceptor.service';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AboutUsComponent } from './about-us/about-us.component'
import { ErrorComponent } from './error/error.component'
import { MatCardModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    AboutUsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    AdminModule,
    ManagerModule,
    MemberModule,
    UserModule,
    ChartsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorService, multi: true
    }, ThemeService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
