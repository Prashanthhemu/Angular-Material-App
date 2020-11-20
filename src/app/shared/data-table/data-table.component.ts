import { Component, Input, OnInit, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialogConfig } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})

export class DataTableComponent implements OnInit, OnChanges {

  @Input() dataTableData: Object[];
  @Input() dataTableColumnData: any[];
  @Input() dataTableFieldNames: string[];
  @Input() itemCount: string;
  @Input() displayCreateButton: boolean = true;

  @Output() pageValueChange = new EventEmitter();
  @Output() onDeleteButtonClick = new EventEmitter();
  @Output() onCreateButtonClick = new EventEmitter();
  @Output() onEditButtonClick = new EventEmitter();
  @Output() onPDFButtonClick = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false })

  paginator: MatPaginator;
  showNoDataMessage: boolean;
  searchKey: string;

  dataSource = new MatTableDataSource();
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = ([...this.dataTableData]);
    if (this.dataSource.data.length == 0 && this.dataSource.data != null) {
      this.showNoDataMessage = true;
    }
    else {
      this.showNoDataMessage = false;
    }
  }

  /* Actions */
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.onCreateButtonClick.emit(dialogConfig);
  }

  onEdit(rowData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { formRowData: rowData },
      this.onEditButtonClick.emit(dialogConfig);
  }

  onPdfEdit(rowData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = { formRowData: rowData },
      this.onEditButtonClick.emit(dialogConfig);
  }

  onDelete(event) {
    this.onDeleteButtonClick.emit(event);
  }

  onPDFClick(event) {
    const uri = event + environment.SASKey;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.panelClass = 'pdf-viewer-dialog-styles',
      dialogConfig.data = { blobUri: uri },
      this.onPDFButtonClick.emit(dialogConfig);
  }

  /* Pagination change action*/
  onPageChange(event?: PageEvent) {
    const values = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize
    }
    this.pageValueChange.emit(values);
  }

  /* Search filter action*/
  onSearchClear() {
    this.searchKey = '';
    this.applySearchFilter();
  }

  applySearchFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}