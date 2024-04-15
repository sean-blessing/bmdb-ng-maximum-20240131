import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credit } from 'src/app/model/credit';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrls: ['./credit-detail.component.css']
})
export class CreditDetailComponent {
  title: string = 'Credit Detail';
  credit: Credit = new Credit();
  creditId: number = 0;
  message?: string = undefined;

  constructor(
    private creditSvc: CreditService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
