import { UlosottovirastoModel } from './../../../core/models/ulosottovirasto-model';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UlosottovirstaService, DataEmitterService, NotificationPopUpService } from 'src/app/core/services';
import { Utilities } from 'src/app/core/common/utilities';
import * as _ from 'lodash';
import * as _moment from 'moment';

const moment = _moment;

const columnDataModel: Object[] = [
    { title: 'Total Amount', fieldName: 'totalAmount', errorMessage: 'Only positive integers are allowed.' },
    { title: 'Loan Agent', fieldName: 'loanAgent' },
    { title: 'Loan ID', fieldName: 'loanId', errorMessage: 'Only positive integers are allowed.' },
    { title: 'Judge Decision Date', fieldName: 'judgeDecisionDate', errorMessage: 'Shoud be in yyyy-MM-dd format.' }
];

const yyyyMMddFormatRegexExpression: string = '((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])';
const positiveIntegerRegexExpression = '^[0-9]\\d*$';
const numericNumberRegexExpression: string = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
const yyyyMMddhhssmmFormatRegexExpression: string = '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]';

@Component({
    selector: 'ulosottovirasta',
    templateUrl: './ulosottovirasta.component.html',
    styleUrls: ['./ulosottovirasta.component.css']
})
export class UlosottovirastaComponent implements OnInit {

    ulosottovirastaFormData: FormGroup;
    addEntityFormData: FormGroup;
    dataTableListData: object[];
    itemCount: string;
    cloumnData: Object[] = columnDataModel;
    formExits: boolean = false;
    ulosottovirastaDetailsFormData: FormGroup;
    ulosottovirstaDataModelCopy: any;
    ulosottovirastoModelData: UlosottovirastoModel;
    errorMessage: string;
    isException: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _utilities: Utilities,
        private _ulosottovirstaService: UlosottovirstaService,
        private _dataEmitterService: DataEmitterService,
        private _notificationPopUpService: NotificationPopUpService,
        private _dialogRef: MatDialogRef<UlosottovirastaComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private selectedFormData: any) { }

    ngOnInit() {
        this.ulosottovirastaDetailsFormData = this._formBuilder.group({
            tableRows: this._formBuilder.array([])
        });
        this.fetchUlosottovirastaData();
    }

    fetchUlosottovirastaData() {
        this._ulosottovirstaService.getUlosottovirsta(this.selectedFormData.formRowData.dataFeedId).subscribe((ulosottovirstaData: any) => {
            if (!ulosottovirstaData.isException && ulosottovirstaData.errorMessage == null) {
                this.formExits = true;
                this.ulosottovirstaDataModelCopy = ulosottovirstaData.model;
                let ulosottovirastoId = this.ulosottovirstaDataModelCopy.ulosottovirastoId;
                this.addEntityFormData = this.initiateEmptyForm(ulosottovirastoId);
                this.ulosottovirastaFormData = this._formBuilder.group({
                    id: [ulosottovirastoId],
                    entityname: [this.ulosottovirstaDataModelCopy.entityName, [Validators.required]],
                    certificate: [moment(this.ulosottovirstaDataModelCopy.certificate), Validators.required],
                    customerId: [this.ulosottovirstaDataModelCopy.customerId, [Validators.required, Validators.pattern(positiveIntegerRegexExpression)]],
                    loanGroupName: [this.ulosottovirstaDataModelCopy.loanGroupName, [Validators.required]],
                    customerPoc: [this.ulosottovirstaDataModelCopy.customerPoc, [Validators.required]]
                });
                this._ulosottovirstaService.getUlosottovirstaDetails(ulosottovirastoId).subscribe((ulosottovirstaDetailsData: any) => {
                    if (!ulosottovirstaDetailsData.isException && ulosottovirstaDetailsData.errorMessage == null) {
                        //this.dataTableListData = ulosottovirstaDetailsData.model.map(data => _.pick(data, ['totalAmount', 'loanAgent', 'loanId', 'judgeDecisionDate']));
                        this.dataTableListData = _.cloneDeep(ulosottovirstaDetailsData.model);
                        const control = this.ulosottovirastaDetailsFormData.get('tableRows') as FormArray;
                        this.dataTableListData.forEach(dataRow => {
                            control.push(this.initiateForm(dataRow));
                        });
                        this._dataEmitterService.toggleDataChange(this.dataTableListData);
                    }
                });
            }
        },
            (error) => {
                let message = this._utilities.hasError(error);
                this.isException = true;
                this.errorMessage = message;
            });
    }

    initiateForm(dataRow): FormGroup {
        return this._formBuilder.group({
            ulosottovirastoId: [dataRow.ulosottovirastoId],
            ulosottovirastoDetailsId: [dataRow.ulosottovirastoDetailsId],
            totalAmount: [dataRow.totalAmount, [Validators.required, Validators.pattern(positiveIntegerRegexExpression)]],
            loanAgent: [dataRow.loanAgent, Validators.required],
            loanId: [dataRow.loanId, [Validators.required, Validators.pattern(positiveIntegerRegexExpression)]],
            judgeDecisionDate: [dataRow.judgeDecisionDate, [Validators.required, Validators.pattern(yyyyMMddFormatRegexExpression)]]
        });
    }

    initiateEmptyForm(ulosottovirastoId): FormGroup {
        return this._formBuilder.group({
            ulosottovirastoId: [ulosottovirastoId],
            ulosottovirastoDetailsId: [null],
            totalAmount: ['', [Validators.required, Validators.pattern(positiveIntegerRegexExpression)]],
            loanAgent: ['', [Validators.required]],
            loanId: ['', [Validators.required, Validators.pattern(positiveIntegerRegexExpression)]],
            judgeDecisionDate: ['', [Validators.required, Validators.pattern(yyyyMMddFormatRegexExpression)]]
        });
    }

    onClose() {
        this._dialogRef.close();
    }

    OnSubmit() {
        if (this.ulosottovirastaFormData.invalid) {
            return;
        }
        const updatedData = _.map(this._dataEmitterService.data, o => _.omit(o, ['ulosottovirasto']));
        this.ulosottovirastoModelData = {
            ulosottovirastoId: this.ulosottovirstaDataModelCopy.ulosottovirastoId,
            dataFeedId: this.ulosottovirstaDataModelCopy.dataFeedId,
            entityName: this.ulosottovirastaFormData.value.entityname,
            certificate: moment(this.ulosottovirastaFormData.value.certificate).format('YYYY-MM-DD'),
            customerId: this.ulosottovirastaFormData.value.customerId,
            loanGroupName: this.ulosottovirastaFormData.value.loanGroupName,
            customerPoc: this.ulosottovirastaFormData.value.customerPoc,
            createdDate: this.ulosottovirstaDataModelCopy.createdDate,
            createdBy: this.ulosottovirstaDataModelCopy.createdBy,
            updatedDate: this.ulosottovirstaDataModelCopy.updatedDate,
            updatedBy: this.ulosottovirstaDataModelCopy.updatedBy,
            ulosottovirastoDetails: updatedData
        };

        this._ulosottovirstaService.createUlosottovirasto(this.ulosottovirastoModelData).subscribe((ulosottovirstaDetailsData: any) => {
            if (!ulosottovirstaDetailsData.isException && ulosottovirstaDetailsData.errorMessage == null) {
                this._notificationPopUpService.success('Updated sucessfully.');
                this.onClose();
            }
        });

    }

}