import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Movie[] = [];

  constructor() {
    if (this.movies.length == 0) {
      this.initializeMovies();
    }
  }

  initializeMovies() {
    this.movies = [];
    let jungleCruise: Movie = new Movie(2, 'Jungle Cruise', 2021,'PG-13', 'Jamue Collet');
    let mulan: Movie = new Movie(1, 'Mulan', 2020, 'PG-13', 'Niki Caro');
    this.movies.push(mulan);
    this.movies.push(jungleCruise);
  }

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie {
    let m: Movie = new Movie();
    for (const movie of this.movies) {
      if (movie.id == id) {
        m = movie;
      }
    }
    return m;
  }

  createMovie(movie: Movie): Movie {
    this.movies.push(movie);
    return movie;
  }

  updateMovie(movie: Movie): void {
    console.log('updateMovie not yet implemented');
  }

  deleteMovie(id: number): boolean {
    let success: boolean = false;
    let m: Movie = this.getMovieById(id);
    if (m.id != 0) {
      let index: number = this.movies.indexOf(m);
      this.movies.splice(index, 1);
      success = true;
    } else {
      console.log('Error - movie id not found for id: ' + id);
    }

    return success;
  }
}
