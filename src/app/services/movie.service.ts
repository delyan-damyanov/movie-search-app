import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie, MovieDetails } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { API_KEY } from '../models/movie.enum';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMovie(query: string): Observable<Movie[]> {
    return this.http
      .get(`${this.baseUrl}/?apikey=${API_KEY.key}&s=${query}`)
      .pipe(map((response: any) => response.Search));
  }

  getMovieDetails(imdbId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseUrl}/?apikey=${API_KEY.key}&i=${imdbId}&plot=full`
    );
  }
}
