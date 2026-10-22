import { Component, Input } from '@angular/core';
import { IMovieItem } from '../interfaces';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExcerptPipe } from '../pipes/excerpt'

/**
 * This component displays short movie info
 * The component is used inside movie-list component
 * 
 * Usage example:
 * @example
 * <app-movie-card [movie]="movie" />
 */

@Component({
  imports: [RouterLink, DatePipe, ExcerptPipe],
  selector: 'app-movie-card',
  styleUrl: './movie-card.scss',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input({ required: true }) movie: IMovieItem = {} as IMovieItem
}
