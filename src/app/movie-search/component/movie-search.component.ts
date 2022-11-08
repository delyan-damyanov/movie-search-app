import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

import { MovieService } from '../movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit {
  movieForm!: FormGroup;
  movies$!: Observable<Movie[]>;
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      query: [''],
    });

    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // Filter out undefined values
        filter(Boolean),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.movies$ = this.movieService.getMovie(text);
      });
  }

  searchMovie(query: string) {
    this.movies$ = this.movieService.getMovie(query);
  }
}
