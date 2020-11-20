import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import * as _ from 'lodash';
import { DataEmitterService } from "src/app/core/services";

@Component({
    selector: 'editable-data-table',
    templateUrl: './editable-data-table.component.html',
    styleUrls: ['./editable-data-table.component.css'],
})
export class EditableDataTableComponent implements OnInit {

    @Input() dataTableColumnsData: Object[];
    @Input() dataTableData: Object[];
    @Input() addEntityEmptyFormData: FormGroup;
    @Input() dataTableFormData: FormGroup;

    constructor(private _dataEmitterService: DataEmitterService, ) { }
    ngOnInit() { }

    addRow() {
        if (this.dataTableFormData.invalid) {
            return;
        }
        const control = this.dataTableFormData.get('tableRows') as FormArray;
        control.push(this.addEntityEmptyFormData);
    }

    get getFormControls() {
        const control = this.dataTableFormData.get('tableRows') as FormArray;
        return control;
    }

    saveUserFormData() {
        if (this.dataTableFormData.invalid) {
            return;
        }
        this._dataEmitterService.toggleDataChange(this.dataTableFormData.value['tableRows']);
    }
}