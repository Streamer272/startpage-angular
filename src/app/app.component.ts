import {Component} from '@angular/core'
import {NavigationEnd, Router} from "@angular/router";
import {SettingsService} from "./settings/settings.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    url: string = "/"
    visited: string[] = []

    constructor(private router: Router, public settingsService: SettingsService) {
        this.url = this.router.url
        this.router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.url = route.url
                if (!this.visited.includes(route.url))
                    this.visited.push(route.url)
            }
        })
    }
}
