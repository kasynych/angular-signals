import { Routes } from '@angular/router';
import { App } from './app';
import { MovieList } from './movie-list/movie-list';
import { MovieDetails } from './movie-details/movie-details';

export const routes: Routes = [
    { path: '', component: MovieList },
    { path: 'movie/:id', component: MovieDetails }
];
