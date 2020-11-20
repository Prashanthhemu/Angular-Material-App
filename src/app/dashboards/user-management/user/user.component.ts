import { UpdateUserModel } from './../../../core/models/update-user-model';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { CreateUserModel } from 'src/app/core/models/create-user-model';
import { NotificationPopUpService } from 'src/app/core/services/notification-popup.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilities } from 'src/app/core/common/utilities';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {
    createUserForm: FormGroup;
    userFormData: CreateUserModel = {};
    updateUserFormData: UpdateUserModel = {};
    showPasswordInputField: boolean = true;
    formTitle: string;
    errorMessage: string;

    constructor(private _formBuilder: FormBuilder,
        private _userManagementService: UserManagementService,
        private _notificationPopUpService: NotificationPopUpService,
        private _utilities: Utilities,
        private _dialogRef: MatDialogRef<UserComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private formData: any) { }

    ngOnInit() {
        if (this.formData != null) {
            this.createUserForm = this._formBuilder.group({
                id: [this.formData.formRowData.id],
                username: [this.formData.formRowData.userName, [Validators.required, Validators.maxLength(environment.maxCharacters)]],
                email: [this.formData.formRowData.email, [Validators.required, Validators.email]],
                firstName: [this.formData.formRowData.firstName],
                lastName: [this.formData.formRowData.lastName]
            });
            this.showPasswordInputField = false;
            this.formTitle = "Update User";
        }
        else {
            this.createUserForm = this._formBuilder.group({
                id: [''],
                username: ['', [Validators.required, Validators.maxLength(environment.maxCharacters)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.maxLength(environment.maxCharacters), Validators.minLength(8)]],
                firstName: [''],
                lastName: ['']
            });
            this.showPasswordInputField = true;
            this.formTitle = "Create User";
        }
    }

    OnSubmit() {
        if (this.createUserForm.valid) {
            let idValue = this.createUserForm.value['id'];
            if (idValue == null || idValue == "") {
                this.userFormData.userName = this.createUserForm.value['username'];
                this.userFormData.email = this.createUserForm.value['email'];
                this.userFormData.password = this.createUserForm.value['password'];
                this.userFormData.firstName = this.createUserForm.value['firstName'];
                this.userFormData.lastName = this.createUserForm.value['lastName'];
                this._userManagementService.createUser(this.userFormData).subscribe((data: any) => {
                    if (!data.isException && data.errorMessage == null) {
                        this.createUserForm.reset();
                        this._notificationPopUpService.success('User Created Sucessfully.');
                        this.onDialogBoxClose();
                    }
                },
                    (error) => {
                        let message = this._utilities.hasError(error);
                        this.errorMessage = message;
                    });
            }
            else {
                this.updateUserFormData.userName = this.createUserForm.value['username'];
                this.updateUserFormData.email = this.createUserForm.value['email'];
                this.updateUserFormData.firstName = this.createUserForm.value['firstName'];
                this.updateUserFormData.lastName = this.createUserForm.value['lastName'];
                this._userManagementService.updateUserDetails(idValue, this.updateUserFormData).subscribe((data: any) => {
                    if (!data.isException) {
                        this.createUserForm.reset();
                        this._notificationPopUpService.success('User updated sucessfully.');
                        this.onDialogBoxClose();
                    }

                },
                    (error) => {
                        let message = this._utilities.hasError(error);
                        this.errorMessage = message;
                    });
            }
        }
    }

    onClose() {
        this.createUserForm.reset();
        this._dialogRef.close({ event: 'close', data: false });
    }

    onDialogBoxClose() {
        this.createUserForm.reset();
        this._dialogRef.close({ event: 'close', data: true });
    }
}