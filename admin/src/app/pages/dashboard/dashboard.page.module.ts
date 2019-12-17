import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from '@pages/dashboard/dashboard-routing.module';
import {DashboardPage} from '@pages/dashboard/dashboard.page';


@NgModule({
    declarations: [
        DashboardPage
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ], exports: [
        DashboardPage
    ]
})
export class DashboardPageModule {
}
