import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent extends BaseComponent implements OnInit {
  title: string = 'Actor-List';
  actors?: Actor[] = undefined;

  constructor(private actorSvc: ActorService,
              sysSvc: SystemService,
              router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.actorSvc.getAllActors().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
