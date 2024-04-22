import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Credit } from 'src/app/model/credit';
import { Movie } from 'src/app/model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { SystemService } from 'src/app/service/system.service';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.css'],
})
export class MovieCreditsComponent extends BaseComponent implements OnInit {
  title: string = 'Movie';
  creditTitle: string = 'Credits';
  movie: Movie = new Movie();
  credits?: Credit[] = undefined;
  movieId: number = 0;

  constructor(
    private movieSvc: MovieService,
    private creditSvc: CreditService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    // get movieId from URL, then get the movie for that movieId
    this.route.params.subscribe({
      next: (parms) => {
        this.movieId = parms['movieId'];
        this.movieSvc.getMovieById(this.movieId).subscribe({
          next: (resp) => {
            this.movie = resp;
          },
          error: (err) => {
            this.logMessage(
              'Movie Credits encountered an error getting Movie: ' + err.message
            );
          },
          complete: () => {},
        });
        // asynchronously get credits for movieId
        this.creditSvc.getCreditsForMovieId(this.movieId).subscribe({
          next: (resp) => {
            this.credits = resp;
          },
          error: (err) => {
            this.logMessage(
              'Movie Credits encountered an error getting Movie: ' + err.message
            );
          },
          complete: () => {},
        });
      },
    });
  }
}
