import {Component} from '@angular/core';
import * as moment from 'moment';
import {SettingsService} from "../settings/settings.service";

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent {
    greeting: string = ""
    time: string = ""
    date: string = ""
    timeFormat: string = ""
    dateFormat: string = ""

    constructor(public settingsService: SettingsService) {
        // intro
        const addIts = this.settingsService.getSetting("enableTime") || this.settingsService.getSetting("enableDate")
        if (this.settingsService.getSetting("enableGreeting")) {
            const date = new Date()
            if (0 <= date.getHours() && date.getHours() < 6)
                this.greeting = "Good night"
            else if (6 <= date.getHours() && date.getHours() < 12)
                this.greeting = "Good morning"
            else if (12 <= date.getHours() && date.getHours() < 18)
                this.greeting = "Good afternoon"
            else if (18 <= date.getHours() && date.getHours() < 24)
                this.greeting = "Good evening"

            if (addIts)
                this.greeting += ", it's"
        } else {
            if (addIts)
                this.greeting = "It's"
        }

        // time
        this.timeFormat = this.settingsService.getSetting("hourFormat") === this.settingsService.OPTIONS["hourFormat"][0] ?
            `h:mm${this.settingsService.getSetting("showSeconds") ? ':ss' : ''} A` : `HH:mm${this.settingsService.getSetting("showSeconds") ? ':ss' : ''}`

        // date
        // TODO: fix
        const day = ["ddd ", "dddd ", " "].at(this.settingsService.OPTIONS["dayFormat"].indexOf(this.settingsService.getSetting("dayFormat")))
        const month = ["MMM", "MMMM"].at(this.settingsService.OPTIONS["monthFormat"].indexOf(this.settingsService.getSetting("monthFormat")))
        const year = [", YY", ", YYYY", ""].at(this.settingsService.OPTIONS["yearFormat"].indexOf(this.settingsService.getSetting("yearFormat")))
        this.dateFormat = `${day}${month} D${year}`
    }

    ngOnInit() {
        this.updateTime()
        setInterval(() => {
            this.updateTime()
        }, 500);
    }

    private updateTime() {
        this.time = moment().format(this.timeFormat)
        this.date = moment().format(this.dateFormat)
    }
}
