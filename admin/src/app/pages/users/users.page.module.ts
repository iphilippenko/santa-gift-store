import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersPage} from '@pages/users/users.page.component';
import {UsersRoutingModule} from '@pages/users/users-routing.module';


@NgModule({
    declarations: [
        UsersPage
    ],
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    exports: [
        UsersPage
    ]
})
export class UsersPageModule {
}
