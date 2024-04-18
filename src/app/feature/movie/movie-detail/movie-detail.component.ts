import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent extends BaseComponent implements OnInit {
  title: string = 'Movie Detail';
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

  override ngOnInit() {
    super.ngOnInit();
    this.checkLogin();
    // get the id from the url
    this.route.params.subscribe({
      next: (parms) => {
        this.movieId = parms['id'];
        this.movieSvc.getMovieById(this.movieId).subscribe({
          next: (parms) => {
            this.movie = parms;
          },
          error: (err) => {
            console.log('Error getting movie by id: ', err);
          },
          complete: () => {}
        });
      },
      error: (err) => {
        console.log('Error getting id from url: ', err);
      },
      complete: () => {},
    });
  }

  delete() {
    this.movieSvc.deleteMovie(this.movieId).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('MovieDetailComponent - error deleting movie.');
          this.message = 'MovieDetailComponent - error deleting movie.';
        } else {
          this.router.navigateByUrl('movie/list');
        }
      },
      error: (err) => {
        console.log(
          'MovieDetailComponent - Error deleting movie: ' + err.message
        );
        this.message =
          'MovieDetailComponent - error deleting movie: ' + err.message;
      },
      complete: () => {},
    });
  }
}
