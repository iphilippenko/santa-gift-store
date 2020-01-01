import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {adminLinks} from '@constants/navigation-links/admin-links';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    currentUrl = '';
    sidenavLinks: Array<{ path: string; label: string; }> = [];
    subscriptions: Array<Subscription> = [];

    constructor(private router: Router
    ) {
    }

    ngOnInit() {
        this.sidenavLinks = [...adminLinks];
        console.log(this.sidenavLinks, adminLinks);
        this.listenCurrentRoute();
    }


    ngOnDestroy(): void {
        this.subscriptions.map(s => s.unsubscribe());
    }

    listenCurrentRoute() {
        this.currentUrl = this.router.url;
        this.subscriptions.push(
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.currentUrl = event.urlAfterRedirects;
                }
            })
        );
    }
}
