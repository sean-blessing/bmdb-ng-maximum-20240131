import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent extends BaseComponent implements OnInit {
  title: string = 'Movie-Create';
  movie: Movie = new Movie();

  constructor(private movieSvc: MovieService,
              sysSvc: SystemService, 
              router: Router) {
                super(sysSvc, router);
              }

  override ngOnInit(): void {
    super.ngOnInit();
    this.checkLogin();  }

  save(): void {
    // NOTE: Check for existence of movie title before save?
    this.movieSvc.createMovie(this.movie).subscribe({
      next: (resp) => {
        this.movie = resp;
        this.router.navigateByUrl('/movie/list');
      },
      error: (err) => {
        this.logMessage("Error creating movie: "+err.message);
      },
      complete: () => {}
    });
  }
}
