import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {SidenavService} from '@services/sidenav-services/sidenav.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() sidenavLinks = [];
    @Input() currentUrl = '';
    @ViewChild('drawer', {static: false}) public drawer;
    subscriptions: Array<Subscription> = [];
    isBigScreen: boolean;

    constructor(
        private sidenavService: SidenavService,
        private mediaObserver: MediaObserver
    ) {
    }

    ngOnInit() {

    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngAfterViewInit(): void {
        console.log(this.drawer);
        this.isBigScreen = this.mediaObserver.isActive('gt-xs');
        if (this.isBigScreen && !this.drawer._opened) {
            this.drawer.toggle();
        }
        this.subscriptions.push(
            this.mediaObserver.asObservable().subscribe(() => {
                this.isBigScreen = this.mediaObserver.isActive('gt-xs');
                if (this.isBigScreen && !this.drawer._opened) {
                    this.drawer.toggle();
                }
                if (!this.isBigScreen && this.drawer._opened) {
                    this.drawer.toggle();
                }
            })
        );
        this.sidenavService.sidenav = this.drawer;
    }

    toggleSidenav() {
        if (!this.isBigScreen) {
            this.drawer.toggle();
        }
    }
}
