import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from '@pages/login/login-routing.module';
import {LoginPage} from '@pages/login/login.page';


@NgModule({
    declarations: [LoginPage],
    imports: [
        CommonModule,
        LoginRoutingModule
    ],
    exports: [
        LoginPage
    ]
})
export class LoginPageModule {
}
