import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  title: string = 'Movie-Create';
  movie: Movie = new Movie();
  message?: string = undefined;

  constructor(private movieSvc: MovieService, private router: Router) {}

  ngOnInit(): void {}

  save(): void {
    // NOTE: Check for existence of movie title before save?
    this.movieSvc.createMovie(this.movie).subscribe({
      next: (resp) => {
        this.movie = resp;
        this.router.navigateByUrl('/movie/list');
      },
      error: (err) => {
        console.log("Error creating movie: ", err);
        this.message = "Error creating Movie.";
      },
      complete: () => {}
    });

  }
}
