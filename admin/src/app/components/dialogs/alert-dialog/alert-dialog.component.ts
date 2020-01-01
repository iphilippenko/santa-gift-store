import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-alert-dialog',
	templateUrl: './alert-dialog.component.html',
	styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
	@Input() message;

	constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {
	}

	ngOnInit() {
	}

}
