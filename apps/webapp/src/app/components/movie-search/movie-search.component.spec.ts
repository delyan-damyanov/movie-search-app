import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

import { MovieSearchComponent } from './movie-search.component';

describe('MovieCardComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSearchComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: MovieService,
          useValue: jasmine.createSpyObj('MovieService', [
            'getMovie',
            'getMovieDetails',
          ]),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have <form> with label "Search for a movie"', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const matLabel = compiled.querySelector('mat-label')!;
    expect(matLabel.textContent).toEqual('Search for a movie');
  });
});
