import { inject, Service, signal, Signal, runInInjectionContext, Injector } from '@angular/core';
import { HttpParams, HttpHeaders, httpResource, HttpResourceRef } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { IMovieResponse, IMoviesResponse } from './interfaces'
import { MOVIES_URL, TOKEN } from './constants';

/**
 * This service class handles API requests using HTTPResource
 */
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

  /**
   * Sets service GET params for API calls
   * @param params: {[ key: string]: string } Updated GET params
   */
  public setParams(params: {[ key: string]: string }) {
    this.params.set({ ...this.params(), ...params })
  }

  /**
   * Sets service GET params to default empty-object value
   */
  public unsetParams() {
    this.params.set({})
  }

  /**
   * Sets service GET param `page`
   * @param page: number Page number
   */
  public setPage(page = 1) {
    this.setParams({ page: String(page) })
  }

  /**
   * Sets service API URL
   * @param url: string
   */
  public setApiUrl(url: string) {
    this.apiUrl.set(String(url))
  }
}
