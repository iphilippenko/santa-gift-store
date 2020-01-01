import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AlertDialogComponent} from '@components/dialogs/alert-dialog/alert-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AlertDialogsService {

	constructor(private dialog: MatDialog) {
	}

	public showAlert(message): Observable<any> {
		let dialogRef: MatDialogRef<AlertDialogComponent>;
		dialogRef = this.dialog.open(AlertDialogComponent, {
			width: '400px',
			height: '200px'
		});

		dialogRef.componentInstance.message = message;

		dialogRef.beforeClosed().subscribe((res) => res);

		return dialogRef.afterClosed();
	}
}
