import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { Movie, MovieDetails } from '../../../../../libs/types/src';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  findAll(query: string) {
    return this.http.get<Movie[]>(`/api/movie?title=${query}`);
  }

  findById(imdbID: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`/api/movie-details/${imdbID}`);
  }
}
