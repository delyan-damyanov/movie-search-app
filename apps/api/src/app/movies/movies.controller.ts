import { Controller, Get, Param, Query } from '@nestjs/common';

import { Observable } from 'rxjs';

import { MovieService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller()
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get('movie')
  async getMovie(
    @Query('title') title: string
  ): Promise<Movie[] | Observable<Movie[]>> {
    return await this.movieService.findAll(title);
  }

  @Get('details/:imdbID')
  async getMovieDetails(@Param('imdbID') imdbID: string) {
    return await this.movieService.findById(imdbID);
  }
}
