import { Injectable } from '@angular/core';
import { Credit } from '../model/credit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL: string = 'http://localhost:8080/api/credits';

@Injectable({
  providedIn: 'root',
})
export class CreditService {

  constructor(private http: HttpClient) {
  }

  getAllCredits(): Observable<Credit[]> {
    return this.http.get(URL + '/') as Observable<Credit[]>;
  }

  getCreditById(id: number): Observable<Credit> {
    return this.http.get(URL + '/' +id) as Observable<Credit>;
  }

  createCredit(credit: Credit): Observable<Credit> {
    return this.http.post(URL, credit) as Observable<Credit>;
  }

  updateCredit(credit: Credit): Observable<Credit> {
    return this.http.put(URL+"/"+credit.id, credit) as Observable<Credit>;
  }

  deleteCredit(id: number): Observable<boolean> {
    return this.http.delete(URL+"/"+id) as Observable<boolean>;
  }}
