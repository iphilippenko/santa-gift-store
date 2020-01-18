import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() filterValue;
	@Output() searchValueChange: EventEmitter<string> = new EventEmitter();

	constructor(private iconRegistry: MatIconRegistry,
				private sanitizer: DomSanitizer) {
		this.defineSearchIcon();
	}

	ngOnInit() {
	}

	defineSearchIcon() {
		this.iconRegistry.addSvgIcon(
			'search_icon',
			this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/svg/search_icon.svg`));
	}

}
