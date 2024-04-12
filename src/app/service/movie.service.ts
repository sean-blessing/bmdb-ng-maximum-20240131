import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const URL: string = 'http://localhost:8080/api/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get(URL + '/') as Observable<Movie[]>;
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get(URL + '/' +id) as Observable<Movie>;
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post(URL, movie) as Observable<Movie>;
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put(URL+"/"+movie.id, movie) as Observable<Movie>;
  }

  deleteMovie(id: number): Observable<boolean> {
    return this.http.delete(URL+"/"+id) as Observable<boolean>;
  }
}
