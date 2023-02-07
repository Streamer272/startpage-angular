import {Component} from '@angular/core';
import {SettingsService} from "./settings.service";
import {Tile, TileTypes} from "../tile";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    rows: Tile[][] = []
    tileTypes = Object.keys(TileTypes)
    newTileType: string

    constructor(public settingsService: SettingsService) {
        this.rows = this.settingsService.getSetting("rows")
        this.newTileType = this.tileTypes[0]
    }

    public setNewTileType(newTileType: string) {
        this.newTileType = newTileType
    }

    public createNewTile(rowIndex: number) {
        // @ts-ignore
        this.rows[rowIndex].push(TileTypes[this.newTileType]())
        this.settingsService.setSetting("rows", this.rows)
    }

    public removeRow(rowIndex: number) {
        this.rows.splice(rowIndex, 1)
        this.settingsService.setSetting("rows", this.rows)
    }


    public changeTile(rowIndex: number, tileIndex: number, property: string) {
        const value = window.prompt("Enter a new value: ", "")
        if (value === null)
            return

        this.rows[rowIndex][tileIndex][property] = value
        this.settingsService.setSetting("rows", this.rows)
    }

    public removeTile(rowIndex: number, tileIndex: number) {
        this.rows[rowIndex].splice(tileIndex, 1)
        this.settingsService.setSetting("rows", this.rows)
    }
}
