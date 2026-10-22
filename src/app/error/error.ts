import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component displays Angular Material Design
 * Snackbar component for error notification
 * The components navigates to homepage on "Ok" click
 * 
 * Usage example:
 * @example
 * <app-error />
 */

@Component({
  imports: [MatSnackBarModule],
  selector: 'app-error',
  styleUrl: './error.scss',
  templateUrl: './error.html',
})
export class Error {
  private snackbar = inject(MatSnackBar);
  private router = inject(Router); 

  constructor() {
    const snackBarRef = this.snackbar.open('Error loading data', 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    snackBarRef.onAction().subscribe(() => {
      document.location.pathname='/' // forces loading homepage
      // this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
    });
  }
}
