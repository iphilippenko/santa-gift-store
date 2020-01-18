import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {MatButtonModule, MatListModule, MatSidenavModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        SidenavComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatButtonModule,
        RouterModule,
        MatSidenavModule,
        FlexLayoutModule,
    ], exports: [
        SidenavComponent
    ]
})
export class SidenavModule {
}
