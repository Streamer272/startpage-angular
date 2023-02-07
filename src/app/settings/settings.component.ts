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

    public getType(tile: Tile): string {
        if (tile instanceof Weather)
            return "Weather"
        else
            return "Shortcut"
    }

    public changeTile(rowIndex: number, tileIndex: number, property: string) {
        const value = window.prompt("Enter a new value: ", "")
        if (!value)
            return

        const row = this.settingsService.getSetting(`row${rowIndex}`)
        row[tileIndex][property] = value
        this.rows[rowIndex] = row
        console.log(`Setting `, row)
        this.settingsService.setSetting(`row${rowIndex}`, row)
    }
}
