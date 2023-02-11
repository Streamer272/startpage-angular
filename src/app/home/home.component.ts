import {Component} from '@angular/core';
import {SettingsService} from "../settings/settings.service";
import {Tile} from "../tile";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    rows: Tile[][] = []
    state: boolean = false

    constructor(public settingsService: SettingsService) {
        this.rows = this.settingsService.getSetting("rows")
    }
}
