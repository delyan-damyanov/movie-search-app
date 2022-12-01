import { Controller, Get, Param, Query } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Movie, MovieDetails } from 'types';
import { MoviesService } from './movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('movie')
  getMovie(@Query('title') title: string): Observable<Movie[]> {
    return this.moviesService.getMovie(title);
  }

  @Get('movie-details/:imdbId')
  getMovieDetails(@Param('imdbId') imdbId: string): Observable<MovieDetails> {
    return this.moviesService.getMovieDetails(imdbId);
  }
}
