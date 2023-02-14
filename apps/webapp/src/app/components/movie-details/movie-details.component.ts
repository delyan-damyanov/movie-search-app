import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { map, Observable, switchMap } from 'rxjs';

import { MovieDetails } from '../../../../../../libs/types/src';
import { MovieService } from '../../services/movie.service';

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
    private readonly movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.movieDetails$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id') as string),
      switchMap((imdbID) => this.movieService.findById(imdbID))
    );

    // for css skeleton loading presentation purpose
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }

  back(): void {
    this.location.back();
  }
}
