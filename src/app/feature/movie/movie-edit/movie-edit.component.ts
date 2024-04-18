import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent extends BaseComponent implements OnInit {
  title: string = 'Movie-Edit';
  movie: Movie = new Movie();
  movieId: number = 0;

  constructor(
    private movieSvc: MovieService,
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
        this.movieId = parms['id'];
        this.movieSvc.getMovieById(this.movieId).subscribe({
          next: (parms) => {
            this.movie = parms;
          },
        });
      },
      error: (err) => {
        this.logMessage('Error editing Movie: '+ err);
      },
      complete: () => {}
    });
  }

  save(): void {
    // NOTE: Check for existence of movie title before save?
    this.movieSvc.updateMovie(this.movie).subscribe({
      next: (resp) => {
        this.movie = resp;
        this.router.navigateByUrl('/movie/list');
      },
      error: (err) => {
        this.logMessage('Error updating movie: '+ err.message);
      },
      complete: () => {},
    });
  }
}
