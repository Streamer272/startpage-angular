import {Component} from '@angular/core';
import {SettingsService} from "./settings.service";
import {TileTypes} from "../tile";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    tileTypes = Object.keys(TileTypes)
    newTileType: string

    constructor(public settingsService: SettingsService) {
        this.newTileType = this.tileTypes[0]
    }

    public setNewTileType(newTileType: string) {
        this.newTileType = newTileType
    }

    public createNewTile(rowIndex: number) {
        const rows = this.settingsService.getSetting("rows")
        // @ts-ignore
        rows[rowIndex].push(TileTypes[this.newTileType]())
        this.settingsService.setSetting("rows", rows)
    }

    public changeTile(rowIndex: number, tileIndex: number, property: string) {
        const value = window.prompt("Enter a new value: ", "")
        if (value == null)
            return

        const rows = this.settingsService.getSetting("rows")
        rows[rowIndex][tileIndex][property] = value
        this.settingsService.setSetting("rows", rows)
    }

    public removeTile(rowIndex: number, tileIndex: number) {
        const rows = this.settingsService.getSetting("rows")
        rows[rowIndex].splice(tileIndex, 1)
        this.settingsService.setSetting("rows", rows)
    }

    public createRow() {
        const rows = this.settingsService.getSetting("rows")
        rows.push([])
        this.settingsService.setSetting("rows", rows)
    }

    public removeRow(rowIndex: number) {
        const rows = this.settingsService.getSetting("rows")
        rows.splice(rowIndex, 1)
        this.settingsService.setSetting("rows", rows)
    }
}
