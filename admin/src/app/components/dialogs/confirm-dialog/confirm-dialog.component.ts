import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
	@Input() message = 'Are you sure you want to delete this item?';
	@Input() actions = ['Cancel', 'Delete'];

	constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
	}

	ngOnInit() {
	}

}
