import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit {
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      query: new FormControl(),
    });
  }

  getMovies(query: string) {
    console.log(query);
  }
}
