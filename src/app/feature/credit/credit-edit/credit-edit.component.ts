import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { Credit } from 'src/app/model/credit';
import { Movie } from 'src/app/model/movie';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { MovieService } from 'src/app/service/movie.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css'],
})
export class CreditEditComponent extends BaseComponent implements OnInit {
  title: string = 'Credit-Edit';
  credit: Credit = new Credit();
  creditId: number = 0;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
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
        this.logMessage('Error editing Credit: ' + err.message);
      },
      complete: () => {},
    });
    this.movieSvc.getAllMovies().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        this.logMessage('Credit Create - error getting movies: ' + err.message);
      },
      complete: () => {},
    });
    this.actorSvc.getAllActors().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        this.logMessage('Credit Create - error getting actors: ' + err.message);
      },
      complete: () => {},
    });
  }

  save(): void {
    // NOTE: Check for existence of credit title before save?
    this.creditSvc.updateCredit(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit/list');
      },
      error: (err) => {
        this.logMessage('Error updating credit: ' + err.message);
      },
      complete: () => {},
    });
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id === b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id === b.id;
  }
}
