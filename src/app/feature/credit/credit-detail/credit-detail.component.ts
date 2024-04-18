import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credit } from 'src/app/model/credit';
import { CreditService } from 'src/app/service/credit.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrls: ['./credit-detail.component.css']
})
export class CreditDetailComponent extends BaseComponent implements OnInit{
  title: string = 'Credit Detail';
  credit: Credit = new Credit();
  creditId: number = 0;

  constructor(
    private creditSvc: CreditService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit() {
    // get the id from the url
    this.route.params.subscribe({
      next: (parms) => {
        this.creditId = parms['id'];
        this.creditSvc.getCreditById(this.creditId).subscribe({
          next: (parms) => {
            this.credit = parms;
          },
        });
      },
      error: (err) => {
        console.log('Error editing Credit: ', err);
      },
      complete: () => {},
    });
  }

  delete() {
    this.creditSvc.deleteCredit(this.creditId).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('CreditDetailComponent - error deleting credit.');
          this.message = 'CreditDetailComponent - error deleting credit.';
        } else {
          this.router.navigateByUrl('credit/list');
        }
      },
      error: (err) => {
        console.log('Error deleting credit: ' + err.message);
      },
      complete: () => {},
    });
  }
}
