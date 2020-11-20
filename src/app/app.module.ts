import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './dashboards/login/login.component';
import { UserManagementComponent } from './dashboards/user-management/user-management.component';
import { DocumentReviewComponent } from './dashboards/document-review/document-review.component';
import { BaseComponent } from './dashboards/base/base.componenet';
import { httpInterceptorProviders } from './core/interceptors';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './dashboards/user-management/user/user.component';
import { Utilities } from './core/common/utilities';
import { ServicesModule } from './core/services/service.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material/material.module';
import { DropDownComponent } from './shared/drop-down/drop-down.component';
import { PDFViewerComponent } from './shared/PDF-viewer/PDF-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UlosottovirastaComponent } from './dashboards/document-review/ulosottovirasta/ulosottovirasta.component';
import { EditableDataTableComponent } from './shared/editable-data-table/editable-data-table.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'base',
    component: BaseComponent,
    children: [
      {
        path: '',
        outlet: 'solidateRouting',
        component: UserManagementComponent
      },
      {
        path: 'user-management',
        outlet: 'solidateRouting',
        component: UserManagementComponent
      },
      {
        path: 'document-review',
        outlet: 'solidateRouting',
        component: DocumentReviewComponent
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    UserManagementComponent,
    DocumentReviewComponent,
    BaseComponent,
    DataTableComponent,
    UserComponent,
    ConfirmDialogComponent,
    DropDownComponent,
    PDFViewerComponent,
    UlosottovirastaComponent,
    EditableDataTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ServicesModule,
    MaterialModule,
    PdfViewerModule
  ],
  providers: [httpInterceptorProviders, Utilities],
  bootstrap: [AppComponent],
  entryComponents: [UserComponent, ConfirmDialogComponent, PDFViewerComponent, UlosottovirastaComponent]
})
export class AppModule { }
