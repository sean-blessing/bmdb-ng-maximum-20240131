import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit{
  title: string = 'Actor-Edit';
  actor: Actor = new Actor();
  actorId: number = 0;
  message?: string = undefined;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        console.log('Error editing Actor: ', err);
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
        console.log('Error updating actor: ', err);
        this.message = 'Error updating Actor.';
      },
      complete: () => {},
    });
  }
}
