import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  private baseUrl = 'http://localhost:8132/manager';

  constructor(private http: HttpClient) { }

  getEnrollmentRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/enrollment`)
  }

  //get all plans
  getPlans(): Observable<any> {

    return this.http.get(this.baseUrl + "/plan")
  }

  //disable plan by Id
  disablePlan(id: number): Observable<any> {
    console.log("inside manager service")
    return this.http.get(this.baseUrl + "/disableplan/" + id, { responseType: 'text' })
  }

  //enable plan by Id
  enablePlan(id: number): Observable<any> {
    console.log("inside manager service")
    return this.http.get(this.baseUrl + "/enableplan/" + id, { responseType: 'text' })
  }

  //Add plan
  addPlan(plan: Object): Observable<Object> {
    console.log("inside manager service")
    return this.http.post(this.baseUrl + "/plan", plan, { responseType: 'text' });
  }

  //find plan by Id
  findPlanById(id: number): Observable<any> {
    console.log("inside manager service")
    return this.http.get(this.baseUrl + "/plan/" + id);
  }

  //Update plan by Id
  updatePlanById(id: number, plan: Object): Observable<Object> {
    console.log("inside manager service")
    return this.http.put(this.baseUrl + "/plan/" + id, plan, { responseType: 'text' });
  }


  id: any
  planReports(managerId) {
    return this.http.get<any>("http://localhost:8132/manager/plan-report-manager/" + managerId)
  }

  batchReportsForManager(managerId) {
    return this.http
      .get<any>("http://localhost:8132/manager/batch-report-manager/" + managerId)
  }
  enrollmentReportsForManager(managerId) {
    return this.http
      .get<any>("http://localhost:8132/manager/enrollment-report-manager/" + managerId)

  }

  //Batch Activity
  //Batch List
  getBatches(): Observable<any> {
    return this.http.get(`${this.baseUrl}/batch`)
  }

  //Disable Batch
  disableBatch(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/disable-batch/${id}`, { responseType: 'text' });
  }

  //Enable Batch
  enableBatch(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/enable-batch/${id}`, { responseType: 'text' })
  }

  //Add Batch
  addBatch(batch: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/batch`, batch, { responseType: 'text' })
  }

  //update Batch
  updateBatch(id: number, batch: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/batch/${id}`, batch, { responseType: 'text' })
  }

  //find batch by id
  findBatch(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/find-batch/${id}`)
  }

  updateEnrollmentStatus(enrollmentId: number, enrollment: Enrollment) {

    return this.http.put('http://localhost:8132/manager/enrollment/' + enrollmentId, enrollment, { responseType: 'text' })
  }  

}

