import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseURL = "http://localhost:8132/admin/";
  constructor(private http: HttpClient) { }

  //to get all Unlock requests
  getUnlockRequest(): Observable<Object[]> {
    return this.http.get<Object[]>(this.baseURL + "unlock-request");
  }

  getSportReport(): Observable<any> {
    return this.http.get(this.baseURL + "sport-report");
  }

  getPlanReport(): Observable<any> {
    return this.http.get(this.baseURL + "plan-report");
  }

  getBatchReport(): Observable<any> {
    return this.http.get(this.baseURL + "batch-report");
  }

  unlockAccount(userId: number): Observable<any> {
    return this.http.get(this.baseURL + "unlock-account/" + userId, { responseType: "text" });
  }

  getManagerList() {
    return this.http.get(this.baseURL + "manager");
  }


  deactivateManager(id: number): Observable<any> {
    return this.http.delete(this.baseURL + "manager/" + id, { responseType: "text" });
  }

  activateManager(id: number): Observable<any> {
    return this.http.get(this.baseURL + "activate-manager/" + id, { responseType: "text" });
  }



  addSport(sport: Object): Observable<string> {
    console.log(sport);
    return this.http.post(this.baseURL + "addsport", sport, { responseType: 'text' })
  }
  viewSports(): Observable<any> {
    return this.http.get(this.baseURL + "getallsport");
  }

  deleteSport(id: number): Observable<any> {
    return this.http.get(this.baseURL + "deletesport/" + id, { responseType: 'text' })
  }

  enableSport(id: number): Observable<any> {
    return this.http.get(this.baseURL + "updatesport/" + id, { responseType: 'text' })
  }
}
