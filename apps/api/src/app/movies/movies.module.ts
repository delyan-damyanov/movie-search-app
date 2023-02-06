import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { MovieSchema } from './schemas/movie.schema';
import { MovieDetailsSchema } from './schemas/movie-details.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Movie', schema: MovieSchema },
      { name: 'MovieDetails', schema: MovieDetailsSchema },
    ]),
  ],
  controllers: [MoviesController],
  providers: [MovieService],
})
export class MoviesModule {}
