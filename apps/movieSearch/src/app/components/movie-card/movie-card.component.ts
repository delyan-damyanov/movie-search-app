import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input()
  movie!: Movie;

  contentLoaded: boolean = false;

  ngOnInit() {
    // for css skeleton loading presentation purpose
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);
  }
}
