import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  public movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): Movie{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id)
      .subscribe({
        next: (data: Movie) => {
          this.movie = data;
        },
        error: (e) => console.error(e)
      });
      return this.movie;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.movie) {
      this.movieService.updateMovie(this.movie)
          .subscribe(() => this.goBack());
    }
  }
}
