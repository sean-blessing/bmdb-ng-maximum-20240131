import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor';
import { ActorService } from 'src/app/service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
})
export class ActorListComponent implements OnInit {
  title: string = 'Actor-List';
  actors?: Actor[] = undefined;

  constructor(private actorSvc: ActorService) {}

  ngOnInit(): void {
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
