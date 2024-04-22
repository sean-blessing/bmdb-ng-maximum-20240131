import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent extends BaseComponent implements OnInit {
  title: string = 'Movie-List';
  movies?: Movie[] = undefined;
  adminUser: boolean = true;
  constructor(
    private movieSvc: MovieService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();
    this.movieSvc.getAllMovies().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        this.logMessage('Movie List encountered an error: ' + err.message);
      },
      complete: () => {},
    });
  }

  
}
