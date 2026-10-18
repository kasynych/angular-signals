import { Component, inject, Signal, computed } from '@angular/core';
import { MovieService } from '../movie-service';
import { MOVIE_URL } from '../constants';
import { ActivatedRoute } from '@angular/router';
import { IMovieResponse } from '../interfaces';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Loading } from '../loading/loading'
import { Error } from '../error/error'

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Loading,
    Error,
    DatePipe
  ],
  selector: 'app-movie-details',
  styleUrl: './movie-details.scss',
  templateUrl: './movie-details.html',
})
export class MovieDetails {
  private moviesService = inject(MovieService)
  private route = inject(ActivatedRoute)
  private movie: Signal<IMovieResponse>
  private status: Signal<'loading' | 'error' | 'loaded' | undefined>
  private genres: Signal<string>
  private origin: Signal<string>

  constructor() {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movie = this.moviesService.data.value as Signal<IMovieResponse>;
    this.genres = computed(() => (
      this.movie()?.genres?.map(g => g.name).join(', ') || ''
    ))
    this.origin = computed(() => (
      this.movie()?.origin_country?.join(', ') || ''
    ))
    this.moviesService.setApiUrl(`${MOVIE_URL}/${movieId}`);
    this.status = computed(() => {
      if (this.moviesService.data.isLoading()) {
        return 'loading'
      } else if (this.moviesService.data.error()) {
        return 'error'
      } else if (this.moviesService.data.hasValue()) {
        return 'loaded'
      }

      return undefined
    })
  }
}
