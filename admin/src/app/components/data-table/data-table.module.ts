import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatSortModule,
	MatTableModule, MatTooltipModule
} from '@angular/material';
import {TableComponent} from './table/table.component';
import {SearchComponent} from './search/search.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import {ClipboardModule} from 'ngx-clipboard';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		DataTableComponent,
		TableComponent,
		SearchComponent
	],
	imports: [
		CommonModule,
		MatTableModule,
		CdkTableModule,
		FormsModule,
		MatFormFieldModule,
		FlexLayoutModule,
		MatInputModule,
		MatPaginatorModule,
		MatSortModule,
		MatIconModule,
		MatButtonModule,
		ClipboardModule,
		MatTooltipModule
	],
	exports: [
		DataTableComponent,
		TableComponent,
		SearchComponent
	]
})
export class DataTableModule {
}
