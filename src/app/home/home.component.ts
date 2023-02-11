import {Component} from '@angular/core';
import {SettingsService} from "../settings/settings.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    update: boolean = false

    constructor(public settingsService: SettingsService) {
        this.settingsService.update.subscribe(() => {
            this.update = !this.update
        })
    }
}
