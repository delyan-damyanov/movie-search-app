import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

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
  }

  searchMovie(query: string) {
    this.movies$ = this.movieService.getMovie(query);
  }
}
