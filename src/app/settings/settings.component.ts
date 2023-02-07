import {Component} from '@angular/core';
import {SettingsService} from "./settings.service";
import {Tile, Weather, Shortcut} from "../tile";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    rows: Tile[][] = []

    constructor(public settingsService: SettingsService) {
        let index = 1;
        while (true) {
            const row = this.settingsService.getSetting(`row${index}`)
            if (row)
                this.rows.push(row)
            else
                break
            index++;
        }
    }

    public getType(tile: Tile): string {
        if (tile instanceof Weather)
            return "Weather"
        else if (tile instanceof Shortcut)
            return "Shortcut"
        return typeof tile
    }
}
