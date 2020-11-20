import { Component, OnInit } from '@angular/core';
import { DataFeedTypeService } from 'src/app/core/services/data-feed-type.service';
import { DataFeedLogService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { PDFViewerComponent } from 'src/app/shared/PDF-viewer/PDF-viewer.component';
import { UlosottovirastaComponent } from './ulosottovirasta/ulosottovirasta.component';



const columnDataModel: Object[] = [
    { title: 'File Name', fieldName: 'fileName' },
    { title: 'Blob Uri', fieldName: 'blobUri' },
    { title: 'Processed Date', fieldName: 'processedDate' },
    { title: 'Is Success', fieldName: 'isSuccess' },
    { title: 'Error', fieldName: 'error' }
];

const columnFieldModel: string[] = ['fileName', 'blobUri', 'processedDate', 'isSuccess', 'error', 'pdfAndEditActions'];

@Component({
    selector: 'document-review',
    templateUrl: './document-review.component.html',
})

export class DocumentReviewComponent implements OnInit {

    dataTableListData: object[];
    cloumnData: Object[] = columnDataModel;
    columnField: string[] = columnFieldModel;
    itemCount: string;
    pageSize: number = 10;
    pageNumber: number = 1;
    displayCreateButton: boolean = false;
    dataFeedTypeList: object[];
    defaultDropDownValue: string;

    constructor(private _dataFeedTypeService: DataFeedTypeService,
        private _dataFeedLogService: DataFeedLogService,
        private _dialog: MatDialog) { }

    ngOnInit() {
        this.fetchDocumentReviewData();
    }

    fetchDocumentReviewData() {
        this.getDataFeedType();
    }

    getDataFeedType() {
        this._dataFeedTypeService.getDataFeedType().subscribe((dataFeedType: any) => {
            if (!dataFeedType.isException && dataFeedType.errorMessage == null) {
                this.dataFeedTypeList = dataFeedType.model;
                this.defaultDropDownValue = dataFeedType.model[0].dataFeedTypeId;
                this.getDataFeedLog(this.pageSize, this.pageNumber);
            }
        });
    }

    getDataFeedLog(pageSize: number, pageNumber: number) {
        this._dataFeedLogService.getDataFeedLog(pageSize, pageNumber, this.defaultDropDownValue).subscribe((dataFeedLog: any) => {
            if (!dataFeedLog.isException && dataFeedLog.errorMessage == null) {
                this.dataTableListData = dataFeedLog.model;
                this.itemCount = dataFeedLog.itemsCount;
            }
        });
    }

    filterDropDownValueChange($event) {
        this.defaultDropDownValue = $event;
        this.getDataFeedLog(this.pageSize, this.pageNumber);
    }

    onPDFClick($event) {
        this._dialog.open(PDFViewerComponent, $event);
    }

    onEdit($event) {
        const dialogRef = this._dialog.open(UlosottovirastaComponent, $event);
    }

    passPageFilter($event) {
        this.pageSize = $event['pageSize'];
        this.pageNumber = $event['pageNumber'];
        this.getDataFeedLog(this.pageSize, this.pageNumber);
    }
}