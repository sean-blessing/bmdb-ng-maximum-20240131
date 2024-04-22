import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { Credit } from 'src/app/model/credit';
import { Movie } from 'src/app/model/movie';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { MovieService } from 'src/app/service/movie.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css'],
})
export class CreditCreateComponent extends BaseComponent implements OnInit{
  title: string = 'Credit-Credit';
  credit: Credit = new Credit();
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    this.movieSvc.getAllMovies().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        this.logMessage('Credit Create - error getting movies: '+err.message);
      },
      complete: () => {},
    });
    this.actorSvc.getAllActors().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        this.logMessage('Credit Create - error getting actors: '+err.message);
      },
      complete: () => {},
    });
  }

  save(): void {
    // NOTE: Check for existence of credit movie-actor before save?
    this.creditSvc.createCredit(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit/list');
      },
      error: (err) => {
        this.logMessage('Error creating credit: '+ err.message);
      },
      complete: () => {},
    });
  }
}
