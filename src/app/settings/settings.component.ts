import {Component} from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    public hourFormatChange(arg: any) {
        console.log("CHANGED to ", arg)
    }
}
