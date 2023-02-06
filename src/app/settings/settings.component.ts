import {Component} from '@angular/core';
import {SettingsService} from "./settings.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    constructor(private settingsService: SettingsService) {
    }

    ngOnInit() {
    }

    public getSetting(name: string): any {
        return this.settingsService.getSetting(name)
    }

    public setSetting(name: string, value: any) {
        this.settingsService.setSetting(name, value)
    }
}
