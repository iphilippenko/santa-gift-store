import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MatButtonModule, MatIconModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		FlexLayoutModule,
		RouterModule,
        MatProgressBarModule
	], exports: [
		HeaderComponent
	]
})
export class HeaderModule {
}
