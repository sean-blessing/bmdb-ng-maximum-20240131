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

  // getCreditById(id: number): Credit {
  //   let m: Credit = new Credit();
  //   for (const credit of this.credits) {
  //     if (credit.id == id) {
  //       m = credit;
  //     }
  //   }
  //   return m;
  // }

  // createCredit(credit: Credit): Credit {
  //   this.credits.push(credit);
  //   return credit;
  // }

  // updateCredit(credit: Credit): void {
  //   console.log('updateCredit not yet implemented');
  // }

  // deleteCredit(id: number): boolean {
  //   let success: boolean = false;
  //   let m: Credit = this.getCreditById(id);
  //   if (m.id != 0) {
  //     let index: number = this.credits.indexOf(m);
  //     this.credits.splice(index, 1);
  //     success = true;
  //   } else {
  //     console.log('Error - credit id not found for id: ' + id);
  //   }

  //   return success;
  // }
}
