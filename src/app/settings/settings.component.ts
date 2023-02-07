import {Component} from '@angular/core';
import {SettingsService} from "./settings.service";
import {Tile} from "../tile";

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
