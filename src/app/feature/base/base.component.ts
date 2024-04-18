import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  loggedInUser: User = new User();
  userName: string = '';
  message?: string = undefined;

  constructor(private sysSvc: SystemService,
              protected router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.userName = this.loggedInUser.firstname;
  }

  logMessage(inMsg: string): void {
    console.log(inMsg);
    this.message = inMsg;
  }

  userLoggedIn(): boolean {
    return (this.loggedInUser.id != 0);
  }

  checkLogin(): void {
    // check loggedInUser, if not logged in, forward to Login page
    // only call this method when ready for primetime
    if (!this.userLoggedIn()) {
      console.log('User not authenticated, redirecting to login');
      this.router.navigateByUrl('/user/login');
    }
  }
}
