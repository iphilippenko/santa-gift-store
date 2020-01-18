import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersPage} from '@pages/users/users.page.component';
import {UsersRoutingModule} from '@pages/users/users-routing.module';
import {DataTableModule} from '@components/data-table/data-table.module';
import {CreateUserDialogModule} from '@components/dialogs/create-user-dialog/create-user-dialog.module';
import {MatSnackBarModule} from '@angular/material';


@NgModule({
    declarations: [
        UsersPage
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        DataTableModule,
        CreateUserDialogModule,
        MatSnackBarModule
    ],
    exports: [
        UsersPage
    ]
})
export class UsersPageModule {
}
