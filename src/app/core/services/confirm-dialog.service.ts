import { MatDialog } from '@angular/material/dialog';
import { Injectable } from "@angular/core";
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
    constructor(private _dialog: MatDialog) { }

    openConfirmDialog(displayMessage) {
        return this._dialog.open(ConfirmDialogComponent, {
            width: '450px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: { message: displayMessage }
        });
    }
}