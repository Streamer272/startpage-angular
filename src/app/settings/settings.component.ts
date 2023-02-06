import {Component} from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    public setSetting(name: string, value: string | number | boolean) {
        console.log(`CHANGED ${name} to ${value}`)
    }
}
