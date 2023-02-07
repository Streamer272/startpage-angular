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

    constructor(public settingsService: SettingsService) {
        let index = 0;
        while (true) {
            const row = this.settingsService.getSetting(`row${index}`)
            if (row)
                this.rows.push(row)
            else
                break
            index++;
        }
    }
}
