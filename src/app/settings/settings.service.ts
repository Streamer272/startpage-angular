import {EventEmitter, Injectable} from "@angular/core";

export interface Settings {
    // intro
    enableIntro: boolean
    enableGreeting: boolean
    // time
    enableTime: boolean
    showSeconds: boolean
    hourFormat: string
    // date
    enableDate: boolean
    dayFormat: string
    monthFormat: string
    yearFormat: string
    // search
    enableSearch: boolean
    // rows
    rows: string

    uid: string

    // magic
    [query: string]: any
}

export const SETTINGS_OPTIONS = {
    "hourFormat": ["12 hour", "24 hour"],
    "dayFormat": ["Short (Mon)", "Long (Monday)", "Don't show day"],
    "monthFormat": ["Short (Jan)", "Long (January)"],
    "yearFormat": ["Short (23)", "Long (2023)", "Don't show year"]
}

export const SETTINGS_DEFAULT = {
    "enableIntro": true,
    "enableGreeting": false,
    "enableTime": true,
    "showSeconds": false,
    "hourFormat": SETTINGS_OPTIONS.hourFormat[0],
    "enableDate": true,
    "dayFormat": SETTINGS_OPTIONS.dayFormat[0],
    "monthFormat": SETTINGS_OPTIONS.monthFormat[0],
    "yearFormat": SETTINGS_OPTIONS.yearFormat[1],
    "enableSearch": true,
    "rows": JSON.stringify([
        [
            {
                "type": "Weather"
            },
            {
                "type": "Shortcut",
                "link1": "https://www.google.com",
                "title1": "Google",
                "icon1": "https://www.google.com/favicon.ico",
                "link2": "https://github.com",
                "title2": "GitHub",
                "icon2": "https://github.com/favicon.ico"
            },
            {
                "type": "Shortcut",
                "link1": "https://reddit.com",
                "title1": "Reddit",
                "icon1": "https://reddit.com/favicon.ico",
                "link2": "",
                "title2": "",
                "icon2": ""
            }
        ]
    ]),
    "uid": ""
}

@Injectable({
    providedIn: "root"
})
export class SettingsService {
    private readonly settings: Settings = SETTINGS_DEFAULT
    public OPTIONS = SETTINGS_OPTIONS

    constructor() {
        const value = localStorage.getItem("settings")
        if (value)
            this.settings = JSON.parse(value)
        else
            localStorage.setItem("settings", JSON.stringify(this.settings))
    }

    public getSetting(name: string): any {
        const value = this.settings[name]
        if (name === "rows") {
            return JSON.parse(value as string)
        }
        return value
    }

    public setSetting(name: string, value: any) {
        if (name === "rows") {
            this.settings[name] = JSON.stringify(value) as any
        } else {
            this.settings[name] = value
        }
        localStorage.setItem("settings", JSON.stringify(this.settings))
    }
}
