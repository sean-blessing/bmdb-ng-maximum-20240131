import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  title: string = 'Movie-List';
  movies?: Movie[] = undefined;

  constructor(private movieSvc: MovieService) {}
  
  ngOnInit(): void {
    this.movies = this.movieSvc.getAllMovies();
    console.log('List of Movies: ', this.movies);
  }
}
