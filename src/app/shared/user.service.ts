import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
  
export class UserService {
  
  private baseURL = "http://localhost:8132/";
  constructor(private http: HttpClient) {}


  registerUser(userData):Observable<any>{
   
    return this.http.post(this.baseURL+"user/register",userData,{responseType:'text'});
  }

//view profile
  getUserById(id:number): Observable<any> {
   return this.http.get(this.baseURL +"user/"+id);
  }

  //update profile
  updateProfile(id:number,profile:any):Observable<any>{
    return this.http.put(this.baseURL + "user/"+id ,profile,{responseType:'text'});

  }

  generateOtp(forgotPassword){
    return this.http.post(this.baseURL+"user/forgot-password",forgotPassword,{responseType:'text'})
  }
  validateOtp(forgotPassword){
    return this.http.post(this.baseURL+"user/validate-otp",forgotPassword,{responseType:'text'})
  }
  passwordReset(resetPassword){
    return this.http.post(this.baseURL+"user/reset-password",resetPassword,{responseType:'text'})
 }

 unlockAccountRequest(unlockRequest){
   return this.http.post(this.baseURL +"user/unlock-request",unlockRequest,{responseType:'text'});
 }

 unlockAccount(unlockAccount){
   return this.http.post(this.baseURL+"user/unlock-account",unlockAccount,{responseType:'text'});
 }

  //change password by id
  changePassword(id:number,value:any):Observable<any>{
     return this.http.post(this.baseURL + "user/changepassword/"+id ,value,{responseType:'text'});
  }
 
  //get health-info by id
  getHealthInfoById(id:number):Observable<any>{
    console.log("in getHealthInfo()")
    return this.http.get(this.baseURL + "user/healthInfo/"+id);
  }

  //add health-info 
  addHealthInfo(id:number,healthInfo:any):Observable<any>{
    console.log(id);
    console.log(healthInfo);
    return this.http.post(this.baseURL + "user/healthInfo/"+id, healthInfo,{responseType:'text'});
  }

  //update health-info
  updateHealthInfo(id:number,healthInfo:any):Observable<any>{
    console.log(id);
    console.log(healthInfo);
    return this.http.put(this.baseURL + "user/healthInfo/"+id, healthInfo,{responseType:'text'});
  }


  //get sports
  getActiveSports():Observable<any>{
    return this.http.get(this.baseURL + "user/get-active-sport")
  }

  
  //get plan by id
  getPlan(planId:number):Observable<Object>{
    return this.http.get(this.baseURL + "user/plan/"+planId);
  }
}


