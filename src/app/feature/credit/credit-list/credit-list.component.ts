import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  title: string = 'Credit-List';
  credits?: Credit[] = undefined;

  constructor(private creditSvc: CreditService) {}

  ngOnInit(): void {
    this.creditSvc.getAllCredits().subscribe({
      next: (resp) => {
        this.credits = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {}
    });
  }
}
