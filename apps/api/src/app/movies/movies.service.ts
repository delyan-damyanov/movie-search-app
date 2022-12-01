import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { map, Observable } from 'rxjs';

import { Movie, MovieDetails } from 'types';
import { environment } from '../../environments/environment';

@Injectable()
export class MoviesService {
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;

  constructor(private http: HttpService) {}

  getMovie(title: string): Observable<Movie[]> {
    return this.http
      .get(`${this.baseUrl}/?apikey=${this.apiKey}&s=${title}`)
      .pipe(map((response) => response.data.Search));
  }

  getMovieDetails(imdbId: string): Observable<MovieDetails> {
    return this.http
      .get(`${this.baseUrl}/?apikey=${this.apiKey}&i=${imdbId}&plot=full`)
      .pipe(map((response) => response.data));
  }
}
