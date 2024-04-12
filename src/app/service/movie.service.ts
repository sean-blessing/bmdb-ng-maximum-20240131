import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';

const URL: string = 'http://localhost:8080/api/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get(URL + '/') as Observable<Movie[]>;
  }

  getMovieById(id: number): Movie {
    let m: Movie = new Movie();

    return m;
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post(URL, movie) as Observable<Movie>;
  }

  updateMovie(movie: Movie): void {
    console.log('updateMovie not yet implemented');
  }

  deleteMovie(id: number): boolean {
    let success: boolean = false;


    return success;
  }
}
