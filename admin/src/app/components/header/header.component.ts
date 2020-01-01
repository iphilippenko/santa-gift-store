import {Component, OnInit} from '@angular/core';
import {User} from '@interfaces/user.interface';
import {SidenavService} from '@services/sidenav-services/sidenav.service';
import {ProgressBarService} from '@services/progress-bar.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	user: User;

	constructor(
		// private authStorage: AuthStorage,
		private sidenavService: SidenavService,
        public progressBarService: ProgressBarService
	) {
	}

	ngOnInit() {
		// this.user = this.authStorage.getUser();
	}

	navOpen() {
		this.sidenavService.sidenav.toggle();
	}

	logout() {
		// this.authStorage.makeLogout();
	}

}
