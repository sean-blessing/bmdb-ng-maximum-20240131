import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css'],
})
export class ActorCreateComponent extends BaseComponent implements OnInit {
  title: string = 'Actor-Create';
  actor: Actor = new Actor();

  constructor(
    private actorSvc: ActorService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {}

  save(): void {
    super.ngOnInit();
    this.checkLogin();
    // NOTE: Check for existence of actor firstname-lastname-bdate before save?
    this.actorSvc.createActor(this.actor).subscribe({
      next: (resp) => {
        this.actor = resp;
        this.router.navigateByUrl('/actor/list');
      },
      error: (err) => {
        console.log('Error creating actor: ', err);
        this.message = 'Error creating Actor.';
      },
      complete: () => {},
    });
  }
}
