import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  movie!: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): Movie[] {
    this.movieService.getMovies()
      .subscribe({
        next: (data: Movie[]) => {
          this.movies = data;
          console.log(this.movies);
        },
        error: (e) => console.error(e)
      });
      return this.movies;
  }

  add(name: string, genre: string, platform: string, description: string): Movie[] {
    var id: number = 0;
    this.addMovie(name, genre, platform, description);
    
    this.getLast(id);
    return this.getMovies();
  }

  addMovie(name: string, genre: string, platform: string, description: string): void {
    if (!(name.trim() || genre || platform || description)) {return;}
    this.movieService.addMovie({id: 0, name, genre, platform, description, watched: false, dateWatched: '' } as Movie)
        .subscribe(movie => {
          this.movies.push(movie);
          console.log(this.movies);
        })
  }

  getLastId(): number {
    this.movieService.getLastMovie()
      .subscribe({
        next: (data: number) => {
          var id = data;
          console.log(id);
          return id;
        },
        error: (e) => {
          console.error(e)
        }
    });
    return 0;
  }

  getLast(id: number): Movie{
    this.movieService.getMovie(id)
      .subscribe({
        next: (data: Movie) => {
          this.movie = data;
        },
        error: (e) => console.error(e)
      });
      return this.movie;
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}

export interface Response {
  status: number,
  message: string
}
