import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { Credit } from 'src/app/model/credit';
import { Movie } from 'src/app/model/movie';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css'],
})
export class CreditCreateComponent {
  title: string = 'Credit-Credit';
  credit: Credit = new Credit();
  movies: Movie[] = [];
  actors: Actor[] = [];
  message?: string = undefined;

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieSvc.getAllMovies().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.log('Credit Create - error getting movies.');
      },
      complete: () => {},
    });
    this.actorSvc.getAllActors().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.log('Credit Create - error getting actors.');
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
        console.log('Error creating credit: ', err);
        this.message = 'Error creating Credit.';
      },
      complete: () => {},
    });
  }
}
