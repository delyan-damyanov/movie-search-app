import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
  });

  it('should create', () => {
    const service: MovieService = TestBed.inject(MovieService);
    expect(service).toBeTruthy();
  });
});
