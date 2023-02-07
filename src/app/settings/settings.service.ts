import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SettingsService {
    private settings: Map<string, any> = new Map<string, any>()
    public OPTIONS = {
        "hourFormat": ["12 hour", "24 hour"],
        "dayFormat": ["Short (Mon)", "Long (Monday)", "Don't show day"],
        "monthFormat": ["Short (Jan)", "Long (January)"],
        "yearFormat": ["Short (23)", "Long (2023)", "Don't show year"]
    }

    constructor() {
        // time
        this.setSetting("enableTime", true)
        this.setSetting("showSeconds", false)
        this.setSetting("hourFormat", this.OPTIONS["hourFormat"][0])

        // date
        this.setSetting("enableDate", true)
        this.setSetting("dayFormat", this.OPTIONS["dayFormat"][0])
        this.setSetting("monthFormat", this.OPTIONS["monthFormat"][0])
        this.setSetting("yearFormat", this.OPTIONS["yearFormat"][1])
    }

    public getSetting(name: string): any {
        return this.settings.get(name)
    }

    public setSetting(name: string, value: any) {
        this.settings.set(name, value)
    }
}
