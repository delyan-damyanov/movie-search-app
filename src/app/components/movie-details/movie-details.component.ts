import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

import { MovieDetails } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails$!: Observable<MovieDetails>;
  contentLoaded: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieDetails$ = this.route.queryParams.pipe(
      map((queryParams) => queryParams['movie_id']),
      switchMap((imdbId) => this.movieService.getMovieDetails(imdbId))
    );

    // for css skeleton loading presentation purpose
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }
}
