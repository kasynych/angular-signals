import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe displays part of a string with ellipsis ending
 * in case the string is too long.
 * The pipe displays full string if the string is within limit.
 * 
 * @example
 * <div>{{ description | excerpt : 50 }}</div>
 */
@Pipe({
  name: 'excerpt',
  standalone: true
})
export class ExcerptPipe implements PipeTransform {
  transform(value: string, limit: number = 100, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}