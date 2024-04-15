import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent {
  title: string = 'Actor Detail';
  actor: Actor = new Actor();
  actorId: number = 0;
  message?: string = undefined;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get the id from the url
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
      complete: () => {},
    });
  }

  delete() {
    this.actorSvc.deleteActor(this.actorId).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('ActorDetailComponent - error deleting actor.');
          this.message = 'ActorDetailComponent - error deleting actor.';
        } else {
          this.router.navigateByUrl('actor/list');
        }
      },
      error: (err) => {
        console.log('Error deleting actor: ' + err.message);
        this.message =
          'ActorDetailComponent - error deleting actor: ' + err.message;
      },
      complete: () => {},
    });
  }
}
