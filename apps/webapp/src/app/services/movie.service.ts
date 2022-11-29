import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie, MovieDetails } from '../../../../../libs/types/src';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`/api/movie?title=${query}`);
  }

  getMovieDetails(imdbId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`/api/movie-details/${imdbId}`);
  }
}
