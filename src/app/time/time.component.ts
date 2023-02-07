import {Component} from '@angular/core';
import * as moment from 'moment';
import {SettingsService} from "../settings/settings.service";

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent {
    time: string = ""
    date: string = ""

    constructor(public settingsService: SettingsService) {
    }

    ngOnInit() {
        this.updateTime()
        setInterval(() => {
            this.updateTime()
        }, 500);
    }

    private updateTime() {
        this.time = moment().format("h:mm A")
        this.date = moment().format("ddd MMM D, YYYY")
    }
}
