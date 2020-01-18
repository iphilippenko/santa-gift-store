import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HeaderModule} from '@components/header/header.module';
import {SidenavModule} from '@components/sidenav/sidenav.module';
import {ConfirmDialogModule} from '@components/dialogs/confirm-dialog/confirm-dialog.module';
import {AlertDialogModule} from '@components/dialogs/alert-dialog/alert-dialog.module';
import {UserService} from '@services/user-services/user.service';


export function initializeApp(userService: UserService) {
    return (): Promise<any> => {
        return Promise.all([userService.getAllRoles()]);
    };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HeaderModule,
        SidenavModule,
        MatButtonModule,
        ConfirmDialogModule,
        AlertDialogModule,
        MatDialogModule,
        MatIconModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [UserService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
