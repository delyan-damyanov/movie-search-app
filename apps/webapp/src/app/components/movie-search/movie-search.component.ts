import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../../../../../libs/types/src';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit {
  movieForm!: FormGroup;
  movies$!: Observable<Movie[]>;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      query: [''],
    });

    this.movies$ = this.movieForm.get('query')!.valueChanges.pipe(
      // Filter out undefined values
      filter(Boolean),
      // Time in milliseconds between key events
      debounceTime(1000),
      // If previous query is diffent from current
      distinctUntilChanged(),
      // Use query to get movies
      switchMap((query) => this.movieService.findAll(query))
    );
  }

  getMovie(query: string): void {
    this.movies$ = this.movieService.findAll(query);
  }
}
