import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'PDF-viewer',
    templateUrl: './PDF-viewer.component.html',
    styleUrls: ['./PDF-viewer.component.css'],
})
export class PDFViewerComponent implements OnInit {
    PDFSourceUri: string;
    loading: boolean = true;
    constructor(private _dialogRef: MatDialogRef<PDFViewerComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private blobUriData: any) { }

    ngOnInit() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        this.PDFSourceUri = proxyurl + this.blobUriData.blobUri;
    }

    pageRendered(e: CustomEvent) {
        this.loading = false;
      }

    onClose() {
        this._dialogRef.close();
    }
}