import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Movie } from './schemas/movie.schema';
import { MovieDetails } from './schemas/movie-details.schema';

@Injectable()
export class MovieService {
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;

  constructor(
    private http: HttpService,
    @InjectModel('Movie')
    private readonly movieModel: Model<Movie>,
    @InjectModel('MovieDetails')
    private readonly movieDetailsModel: Model<MovieDetails>
  ) {}

  async findAll(title: string): Promise<Movie[] | Observable<Movie[]>> {
    // Search mongoDB database for movie records matching the title
    const data = await this.movieModel
      .findOne({ $text: { $search: title } })
      .exec();

    // If a match is found, return the ALL movie records matching the title
    if (data) {
      return await this.movieModel.find({ $text: { $search: title } }).exec();
    }

    // If no match is found in the mongoDB database, make an API call to omdb
    const response = this.http
      .get(`${this.baseUrl}/?apikey=${this.apiKey}&s=${title}`)
      .pipe(map((response) => response.data.Search));

    // Write the newly fetched movie records to the mongoDB database
    response.subscribe(async (response) => {
      const newData = response.map(
        (response: Movie) => new this.movieModel(response)
      );
      await this.movieModel.insertMany(newData);
    });

    // Return the newly fetched movie records
    return response;
  }

  async findById(imdbID: string) {
    // Search mongoDB database for movie details record matching the imdbID
    const data = await this.movieDetailsModel
      .findOne({ $text: { $search: imdbID } })
      .exec();

    // If a match is found, return the movie details record matching the imdbID
    if (data) {
      return await this.movieDetailsModel
        .findOne({ $text: { $search: imdbID } })
        .exec();
    }

    // If no match is found in the mongoDB database, make an API call to omdb
    const response = this.http
      .get(`${this.baseUrl}/?apikey=${this.apiKey}&i=${imdbID}&plot=full`)
      .pipe(map((response) => response.data));

    // Write the newly fetched movie details record to the mongoDB database
    response.subscribe(async (response) => {
      const newData = new this.movieDetailsModel(response);
      await newData.save();
    });

    // Return the newly fetched movie details record
    return response;
  }
}
