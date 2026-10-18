import { Component, Input } from '@angular/core';
import { IMovieItem } from '../interfaces';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExcerptPipe } from '../pipes/excerpt'

@Component({
  imports: [RouterLink, DatePipe, ExcerptPipe],
  selector: 'app-movie-card',
  styleUrl: './movie-card.scss',
  templateUrl: './movie-card.html',
})
export class MovieCard {
  @Input({ required: true }) movie: IMovieItem = {} as IMovieItem
}
