import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import { NotificationPopUpService } from 'src/app/core/services/notification-popup.service';
import { ConfirmDialogService } from 'src/app/core/services';

const columnDataModel: Object[] = [
    { title: 'User Name', fieldName: 'userName' },
    { title: 'Email', fieldName: 'email' },
    { title: 'First Name', fieldName: 'firstName' },
    { title: 'Last Name', fieldName: 'lastName' },
];

const columnFieldModel: string[] = ['userName', 'email', 'firstName', 'lastName', 'editAndDeleteActions'];

@Component({
    selector: 'user-management',
    templateUrl: './user-management.component.html',
})

export class UserManagementComponent implements OnInit {
    dataTableListData: object[];
    cloumnData: Object[] = columnDataModel;
    columnField: string[] = columnFieldModel;
    itemCount: string;
    pageSize: number = 10;
    pageNumber: number = 1;

    constructor(private _userManagementService: UserManagementService,
        private _dialog: MatDialog,
        private _notificationPopUpService: NotificationPopUpService,
        private _confirmDialogService: ConfirmDialogService) {
    }

    ngOnInit() {
        this.fetchUserManagementData();
    }

    fetchUserManagementData() {
        this.getUserListData(this.pageSize, this.pageNumber);
    }

    getUserListData(pageSize: number, pageNumber: number) {
        this._userManagementService.getUsers(pageSize, pageNumber).subscribe((userData: any) => {
            if (!userData.isException && userData.errorMessage == null) {
                this.dataTableListData = userData.model;
                this.itemCount = userData.itemsCount;
            }
        });
    }

    onCreate($event) {
        const dialogRef = this._dialog.open(UserComponent, $event);
        dialogRef.afterClosed().subscribe(value => {
            if (value.data) {
                this.getUserListData(this.pageSize, this.pageNumber);
            }
        });
    }

    onEdit($event) {
        const dialogRef = this._dialog.open(UserComponent, $event);
        dialogRef.afterClosed().subscribe(value => {
            if (value.data) {
                this.getUserListData(this.pageSize, this.pageNumber);
            }
        });
    }

    onDelete($event) {
        this._confirmDialogService.openConfirmDialog('Are you sure to delete this record?')
            .afterClosed().subscribe(dialogStatus => {
                if (dialogStatus) {
                    this._userManagementService.deleteUserDetails($event).subscribe((userData: any) => {
                        if (!userData.isException) {
                            this.getUserListData(this.pageSize, this.pageNumber);
                            this._notificationPopUpService.warn("! Deleted Sucessfully.");
                        }
                    });
                }
            });
    }

    passPageFilter($event) {
        this.pageSize = $event['pageSize'];
        this.pageNumber = $event['pageNumber'];
        this.getUserListData(this.pageSize, this.pageNumber)
    }
}
