import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationPopUpService {
    constructor(private _matSnackBar: MatSnackBar) { }

    popUpConfig: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
    }
    success(message) {
        this.popUpConfig.panelClass = ['notification', 'success']
        this._matSnackBar.open(message, '', this.popUpConfig);
    }

    warn(message) {
        this.popUpConfig.panelClass = ['notification', 'warn']
        this._matSnackBar.open(message, '', this.popUpConfig);
    }
}