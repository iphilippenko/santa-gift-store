import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableHeader} from '../../interfaces/table.interface';
import {TableComponent} from './table/table.component';
import {SearchComponent} from './search/search.component';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
    @Input() footerSearch = false;
    @Input() paginate = false;
	@Input() filterValue = '';
	@Input() itemsLength = 0;
	@Input() createBtnName: string;
	@Input() exportDataBtnName: string;
	@Input() tableData = [];
	@Input() tableHeaders: Array<TableHeader> = [];
	@Input() actionButtons: Array<string> = [];
	@Output() retrieveDataChanges: EventEmitter<any> = new EventEmitter();
	@Output() create: EventEmitter<any> = new EventEmitter();
	@Output() exportData: EventEmitter<any> = new EventEmitter();
	@Output() edit: EventEmitter<string> = new EventEmitter();
	@Output() delete: EventEmitter<string> = new EventEmitter();
	@Output() view: EventEmitter<string> = new EventEmitter();
	@ViewChild(TableComponent, {static: false}) tableComponent;
	@ViewChild(SearchComponent, {static: false}) search;

	constructor() {
	}

	ngOnInit() {
	}

	resetTableFilters() {
		this.tableComponent.resetColumnFilters();
		this.search.filterValue = '';
	}

}
