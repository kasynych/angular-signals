import { inject, Service, signal, Signal, runInInjectionContext, Injector } from '@angular/core';
import { HttpParams, HttpHeaders, httpResource, HttpResourceRef } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { IMovieResponse, IMoviesResponse } from './interfaces'
import { MOVIES_URL, TOKEN } from './constants';

@Service()

export class MovieService {
  private params = signal({});
  public apiUrl = signal(MOVIES_URL);
  public data: HttpResourceRef<IMoviesResponse | IMovieResponse> = httpResource(() => (
    {
      url: this.apiUrl(),
      method: 'GET',
      params: this.params(),
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: 'application/json'
      },
    }),
    {
      defaultValue: {} as any
    }
  );

  public setParams(params: {[ key: string]: string }) {
    this.params.set({ ...this.params(), ...params })
  }

  public unsetParams() {
    this.params.set({})
  }

  public setPage(page = 1) {
    this.setParams({ page: String(page) })
  }

  public setApiUrl(url: string) {
    this.apiUrl.set(String(url))
  }
}
