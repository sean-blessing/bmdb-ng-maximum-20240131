import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css'],
})
export class ActorEditComponent extends BaseComponent implements OnInit {
  title: string = 'Actor-Edit';
  actor: Actor = new Actor();
  actorId: number = 0;

  constructor(
    private actorSvc: ActorService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.route.params.subscribe({
      next: (parms) => {
        this.actorId = parms['id'];
        this.actorSvc.getActorById(this.actorId).subscribe({
          next: (parms) => {
            this.actor = parms;
          },
        });
      },
      error: (err) => {
        this.logMessage('Error editing Actor: ' + err);
      },
    });
  }

  save(): void {
    // NOTE: Check for existence of actor title before save?
    this.actorSvc.updateActor(this.actor).subscribe({
      next: (resp) => {
        this.actor = resp;
        this.router.navigateByUrl('/actor/list');
      },
      error: (err) => {
        this.logMessage('Error updating actor: ' + err.message);
      },
      complete: () => {},
    });
  }
}
