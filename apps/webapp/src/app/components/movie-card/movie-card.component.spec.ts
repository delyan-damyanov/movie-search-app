import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have <mat-card> with class "movie-card"', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const matCard = compiled.querySelector('mat-card')!;
    expect(matCard && matCard.classList.contains('movie-card')).toBeTruthy();
  });
});
