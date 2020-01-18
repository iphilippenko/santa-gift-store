import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {
    MAT_TOOLTIP_DEFAULT_OPTIONS,
    MatIconRegistry,
    MatPaginator,
    MatSort,
    MatTableDataSource,
    MatTooltipDefaultOptions
} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {TableHeader} from '@interfaces/table.interface';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 0,
    hideDelay: 500,
    touchendHideDelay: 500,
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
    ],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() footerSearch = false;
    @Input() paginate = false;
    @Input() tableData = [];
    @Input() itemsLength = 0;
    @Input() tableHeaders: Array<TableHeader> = [];
    @Input() filterValue = '';
    @Input() actionButtons: Array<String> = [];
    @Output() retrieveDataChanges: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<string> = new EventEmitter();
    @Output() delete: EventEmitter<string> = new EventEmitter();
    @Output() view: EventEmitter<string> = new EventEmitter();
    @Output() columnSearch: EventEmitter<void> = new EventEmitter();

    iconsList = ['copy_icon', 'edit_icon', 'delete_icon', 'search_icon', 'view_icon'];
    displayedColumns: string[] = [];
    filteredColumns: { [key: string]: string } = {};

    dataSource: MatTableDataSource<any>;

    subscriptions: Array<Subscription> = [];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer,
                private http: HttpClient) {
        this.defineActionIcons();
    }

    ngOnInit() {
        this.parseTableData(true);
    }

    ngOnDestroy(): void {
        this.subscriptions.map(s => s.unsubscribe());
        this.dataSource.disconnect();
    }

    ngAfterViewInit(): void {
        if (typeof this.dataSource !== 'undefined') {
            this.dataSource.sort = this.sort;
        }
        this.subscriptions.push(
            this.sort.sortChange.subscribe((data) => {
                // If the user changes the sort order, reset back to the first page.
                if (this.paginator) {
                    this.paginator.pageIndex = 0;
                }

                this.retrieveTableData();
            })
        );
        if (this.paginator) {
            this.subscriptions.push(
                this.paginator.page.subscribe(page => {
                    this.retrieveTableData();
                })
            );
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.tableData && !changes.tableData.isFirstChange())
            || changes.tableHeaders) {
            this.parseTableData(typeof this.dataSource === 'undefined');
        }
        if (changes.filterValue && !changes.filterValue.isFirstChange()) {
            this.applyMainFilter(this.filterValue);
        }
    }

    resolveValue(path, obj = self, separator = '.') {
        let properties = Array.isArray(path) ? path : path.split(separator);
        return properties.reduce((prev, curr) => prev && prev[curr], obj);
    }

    retrieveTableData(filterAllValues?: string) {
        // Set columns filters
        let filterBy = {...this.filteredColumns};

        // If there is filtration by all columns - replace all filters
        if ((filterAllValues && filterAllValues.length) || this.filterValue.length) {
            Object.keys(filterBy).map(key => {
                filterBy[key] = filterAllValues || this.filterValue.trim().toLowerCase();
            });
        }

        let retrieveData = {
            sort: {
                active: this.sort.active,
                direction: this.sort.direction
            },
            filterBy: filterBy
        };

        if (this.paginator) {
            retrieveData['pagination'] = {
                pageIndex: this.paginator.pageIndex,
                pageSize: this.paginator.pageSize
            };
        }

        // If there is filtration by all columns - replace all filters
        if ((filterAllValues && filterAllValues.length) || this.filterValue.length) {
            retrieveData['global'] = true;
        }

        this.retrieveDataChanges.emit(retrieveData);
    }

    applyFilterByCol(value) {
        this.columnSearch.emit();
        this.resetPaginator();
        this.retrieveTableData();
    }

    resetColumnFilters() {
        Object.keys(this.filteredColumns).map(key => this.filteredColumns[key] = '');
    }

    applyMainFilter(filterValue: string) {
        if (this.dataSource) {
            if (filterValue.length && Object.values(this.filteredColumns).some(val => val.length > 0)) {
                this.resetColumnFilters();
            }
            this.resetPaginator();
            this.retrieveTableData(filterValue.trim().toLowerCase());
        }
    }

    resetPaginator() {
        if (this.dataSource && this.paginator) {
            this.paginator.firstPage();
        }
    }

    parseTableData(firstChange?) {
        if (this.tableHeaders.length) {
            // Assign the data to the data source for the table to render
            if (firstChange && typeof this.dataSource === 'undefined') {
                // Define displayed and filtered columns
                this.displayedColumns = this.tableHeaders.map(header => header.sortName ? header.sortName : header.selector);
                this.displayedColumns
                    .map(header => {
                        if (header !== 'actions' && header !== 'createdAt' && header !== 'updatedAt') {
                            this.filteredColumns[header] = '';
                        }
                    });

                // Set data source
                this.dataSource = new MatTableDataSource(this.tableData || []);
                if (typeof this.sort !== 'undefined') {
                    this.dataSource.sort = this.sort;
                }
            } else {
                this.dataSource.data = this.tableData || [];
            }
        }
    }

    defineActionIcons() {
        this.iconsList.map(iconName => {
            this.iconRegistry.addSvgIcon(
                iconName,
                this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/svg/${iconName}.svg`));
        });
    }

    showTooltip(el) {
        el.disabled = false;
        el.show();
        setTimeout(() => {
            el.disabled = true;
        }, 500);
    }

}



