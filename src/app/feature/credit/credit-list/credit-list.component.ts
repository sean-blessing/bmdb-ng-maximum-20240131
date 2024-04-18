import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit';
import { CreditService } from 'src/app/service/credit.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent extends BaseComponent implements OnInit {
  title: string = 'Credit-List';
  credits?: Credit[] = undefined;

  constructor(private creditSvc: CreditService,
              sysSvc: SystemService,
              router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
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
