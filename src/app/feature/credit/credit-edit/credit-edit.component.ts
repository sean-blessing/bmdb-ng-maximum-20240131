import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { Credit } from 'src/app/model/credit';
import { Movie } from 'src/app/model/movie';
import { ActorService } from 'src/app/service/actor.service';
import { CreditService } from 'src/app/service/credit.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css'],
})
export class CreditEditComponent {
  title: string = 'Credit-Edit';
  credit: Credit = new Credit();
  creditId: number = 0;
  movies: Movie[] = [];
  actors: Actor[] = [];
  message?: string = undefined;

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        console.log('Error editing Credit: ', err);
      },
      complete: () => {},
    });
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
    // NOTE: Check for existence of credit title before save?
    this.creditSvc.updateCredit(this.credit).subscribe({
      next: (resp) => {
        this.credit = resp;
        this.router.navigateByUrl('/credit/list');
      },
      error: (err) => {
        console.log('Error updating credit: ', err);
        this.message = 'Error updating Credit.';
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
