import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {AlertDialogComponent} from './alert-dialog.component';


@NgModule({
	declarations: [
		AlertDialogComponent
	],
	entryComponents: [
		AlertDialogComponent
	],
	exports: [
		AlertDialogComponent,
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule
	]
})
export class AlertDialogModule {
}
