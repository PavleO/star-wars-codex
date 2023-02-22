import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private _snackBar: MatSnackBar) {}
    handleError(error: Error): void {
        this._snackBar.open(error.message, 'OK');
    }
}
