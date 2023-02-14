import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
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

  destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      query: [''],
    });

    // Load relevant search results based on query parameters (if there are any).
    // Needed for link sharing or URL bookmarking but mainly going back from another page (e.g. the details page)
    // so we can retrieve the same search results and not force another search query input.
    this.route.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe((queryParams) => {
        if (queryParams['q']) {
          // Use query to get movies
          this.movies$ = this.movieService.findAll(queryParams['q']);
          // Populate search input field with query
          this.movieForm.get('query')!.setValue(queryParams['q']);
        }
      });

    // Load relevant search results based on search query entered in the input field
    this.movieForm
      .get('query')!
      .valueChanges.pipe(
        takeUntil(this.destroy),
        // Filter out undefined values
        filter(Boolean),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.router.navigate(['/search'], {
          queryParams: { q: query },
        });

        // Use query to get movies
        this.movies$ = this.movieService.findAll(query);
      });
  }

  getMovie(query: string): void {
    this.router.navigate(['/search'], {
      queryParams: { q: query },
    });

    this.movies$ = this.movieService.findAll(query);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
