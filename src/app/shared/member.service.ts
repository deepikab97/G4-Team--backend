import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Enrollment } from '../models/enrollment';
import { Plan } from '../models/plan';
import { Review } from '../models/review';


@Injectable({
  providedIn: 'root'
})

  
 
export class MemberService {

  private baseURL = "http://localhost:8132/member/";
  constructor(private http: HttpClient) {}

  getbatches(planId:number): Observable<any> {
    return this.http.get(this.baseURL + "view-batches/" + planId);
  }

  enrollMember(enrollment:Enrollment){
    return this.http.post(this.baseURL + "enroll-user/",enrollment,{ responseType: "text"});

  }
  getPlansForMember(id:number):Observable<any>{
   
    return this.http.get(this.baseURL+ "plan/"+id);
  }

  

  likePlan(userId:number,planReview:Review){
    return this.http.post(this.baseURL+"like/"+userId,planReview);
  }

  showComments(planId:number){
    return this.http.get(this.baseURL+"comments/"+planId);
  }
  //Enrollment Activity

  //member enrollments

  memberEnrollments(id:number):Observable<any>{
    return this.http.get(this.baseURL+ "enrollment/"+id);
  }

  //to get the receipt for an enrollment record
  viewReceipt(id:number):Observable<any>{
    return this.http.get(this.baseURL+'view-receipt/'+id)
  }


  //find enrollment
  findEnrollment(id:number):Observable<any>{
    return this.http.get(this.baseURL+"find-enrollment/"+id);
  }

  //update enrollment
  updateEnrollment(enrollment:Enrollment){
    return this.http.put(this.baseURL+"update-enrollment/",enrollment,{responseType:'text'});
  }

  getCompletedPlans(userId:number){
    return this.http.get(this.baseURL+"feedbacks/"+userId);
  }

  comment(userId:number,comment:Review){
    return this.http.post(this.baseURL+"comment/"+userId,comment,{responseType:'text'});
  }

  getCommentForUser(userId:number,comment:Review){
    return this.http.post(this.baseURL+"get-comment/"+userId,comment);
  }
}
