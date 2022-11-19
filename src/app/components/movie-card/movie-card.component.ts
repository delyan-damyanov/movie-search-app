import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input()
  movie!: Movie;

  contentLoaded = false;

  ngOnInit() {
    // for css skeleton loading presentation purpose
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }
}
