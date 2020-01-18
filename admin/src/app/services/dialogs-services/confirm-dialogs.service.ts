import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/dialogs/confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ConfirmDialogsService {

	constructor(private dialog: MatDialog) {
	}

	public deleteConfirmDialog(message, actions: Array<string>): Observable<any> {

		let dialogRef: MatDialogRef<ConfirmDialogComponent>;

		dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '250px',
			height: '200px'
		});
		dialogRef.componentInstance.message = message;
		dialogRef.componentInstance.actions = actions;

		dialogRef.beforeClosed().subscribe((res) => res);

		return dialogRef.afterClosed();
	}
}
