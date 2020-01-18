import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
	declarations: [
		ConfirmDialogComponent
	],
	entryComponents: [
		ConfirmDialogComponent
	],
	exports: [
		ConfirmDialogComponent,
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule
	]
})
export class ConfirmDialogModule {
}
