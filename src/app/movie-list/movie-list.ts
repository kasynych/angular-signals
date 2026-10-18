import { Signal, Component, inject, signal, ViewChild, computed } from '@angular/core';
import { MovieService } from '../movie-service'
import { IMoviesResponse } from '../interfaces'
import { PageEvent, MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MOVIES_URL, SEARCH_URL } from '../constants';
import { Loading } from '../loading/loading'
import { Error } from '../error/error'
import { MovieCard } from '../movie-card/movie-card';
import { NoResults } from '../no-results/no-results'

@Component({
  imports: [
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    Loading,
    Error,
    MovieCard,
    NoResults
  ],
  selector: 'app-movie-list',
  styleUrl: './movie-list.scss',
  templateUrl: './movie-list.html',
})
export class MovieList {
  private moviesService = inject(MovieService)
  private movies: Signal<IMoviesResponse>
  private filterValue = signal('')
  private debounceTimeout: number = 0
  private status: Signal<'loading' | 'error' | 'loaded' | undefined>
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor() {
    this.moviesService.setApiUrl(MOVIES_URL);
    this.moviesService.setPage(1);
    this.movies = this.moviesService.data.value as Signal<IMoviesResponse>;
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

  handlePageEvent(event: PageEvent) {
    this.moviesService.setPage(event.pageIndex + 1);
  }

  onFilterValueChange(event: KeyboardEvent) {
    if(this.debounceTimeout) {
      clearInterval(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => {
      if ((event.target as HTMLInputElement)?.value) {
        this.moviesService.setApiUrl(SEARCH_URL);
        this.moviesService.setParams({ query: (event.target as HTMLInputElement)?.value });
        this.paginator.firstPage();
      } else {
        this.redirectHome()
      }
    }, 500)
  }

  onClearFilterClick() {
    this.redirectHome();
  }

  redirectHome() {
    this.moviesService.setApiUrl(MOVIES_URL);
    this.moviesService.unsetParams()
    this.moviesService.setParams({ page: '1' });
    this.filterValue.set('');
    this.paginator.firstPage();
  }
}
