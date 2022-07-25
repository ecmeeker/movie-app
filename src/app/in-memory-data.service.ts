import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const movies = 
      [
        { id: 1, name: 'The Princess Bride', genre: 'comedy', platform: 'Hulu', description: 'Rob Reiner\'s debut of a satirical medieval love story', watched: false, dateWatched: "" },
        { id: 2, name: 'Monty Python and the Holy Grail', genre: 'comedy', platform: 'DVD', description: 'Best movie ever made', watched: false, dateWatched: ''},
        { id: 3, name: 'Wait Until Dark', genre: 'thriller', platform: 'Apple TV', description: 'A newly blind woman must outsmart a deadly thief', watched: false, dateWatched: ''},
    ];
    return {movies};
  }

  // genId(movies: Movie[]): number {
  //   return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;
  // }

  constructor() { }
}
