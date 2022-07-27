import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'http://localhost:8000/movies';
  private movieUrl = 'http://localhost:8000/movie';
  private movieDbUrl = "https://api.themoviedb.org/3/search/";
  private apiKey = "2eb5bf99a059f893c4b79118ca3b20a0";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl, this.httpOptions)
                    .pipe(
                      map((movies: Movie[]) => {
                        return movies;
                      }),
                      tap(_ => this.log('fetched movies: ')),
                    );
  }
  

  getMovie(id: number): Observable<Movie> { 
    const url = `${this.movieUrl}/${id}`;
    return this.http.get<Movie>(url, this.httpOptions)
            .pipe(
              map((movie: Movie) => {
                console.log(movie);
                return movie;
              }),
              tap(_ => this.log(`fetched movie id=${id}`)),
              catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.movieUrl, movie, this.httpOptions).pipe(
                  tap(_ => this.log(`updated movie id=${movie.id}`)),
                  catchError(this.handleError<Movie>('updateMovie'))
                );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.movieUrl, movie, this.httpOptions).pipe(
                  tap((newMovie: Movie) => this.log(`added movie`)),
                  catchError(this.handleError<Movie>('addMovie'))
                )
  }

  getLastMovie(): Observable<number> {
    const url = `${this.movieUrl}/lastinsert`
    return this.http.get<number>(url, this.httpOptions)
            .pipe(
              map((id: number) => {
                return id;
              }),
              catchError(this.handleError<number>(`getlastmovie`))
            );
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    const url = `${this.movieUrl}/${movie.id}`;
    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted movie id=${movie.id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    )
  }

  getMovieInfo(name: string): Observable<any> {
    const url = `${this.movieDbUrl}movie?query=${name}&api_key=${this.apiKey}`;
    return this.http.get<any>(url, this.httpOptions)
                    .pipe(
                      map((data: any) => {
                        return data;
                      }),
                    ); 
  }

  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.mesage}`);
      return of(result as T);
    }
  }
}
