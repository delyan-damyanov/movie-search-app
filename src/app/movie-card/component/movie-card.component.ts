import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/movie-search/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input()
  movie!: Movie;
}
