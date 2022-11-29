import { Controller, Get, Param, Query } from '@nestjs/common';

import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { Movie, MovieDetails } from 'types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('movie')
  getMovie(@Query('title') title: string): Observable<Movie[]> {
    return this.appService.getMovie(title);
  }

  @Get('movie-details/:imdbId')
  getMovieDetails(@Param('imdbId') imdbId: string): Observable<MovieDetails> {
    return this.appService.getMovieDetails(imdbId);
  }
}
