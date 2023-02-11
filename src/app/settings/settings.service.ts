import {EventEmitter, Injectable} from "@angular/core";
import {newShortcut, newWeather} from "../tile";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from "@angular/router";

export enum SettingsKeys {
    ENABLE_INTRO = "enableIntro",
    ENABLE_GREETING = "enableGreeting",
    ENABLE_TIME = "enableTime",
    SHOW_SECONDS = "showSeconds",
    HOUR_FORMAT = "hourFormat",
    ENABLE_DATE = "enableDate",
    DAY_FORMAT = "dayFormat",
    MONTH_FORMAT = "monthFormat",
    YEAR_FORMAT = "yearFormat",
    ENABLE_SEARCH = "enableSearch",
    ROWS = "rows",
}

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
    rows: Array<Array<any>>

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
    "rows": `[
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
]`,
}

@Injectable({
    providedIn: "root"
})
export class SettingsService {
    private settingsId?: string
    private settings?: Settings

    public ready: EventEmitter<boolean> = new EventEmitter<boolean>()
    public OPTIONS = SETTINGS_OPTIONS

    constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
        this.registerAuthListener(this.onAuthStateChanged)
    }

    public getSetting(name: string): any | undefined {
        if (!this.settings)
            return undefined

        const value = this.settings[name]
        if (name === "rows") {
            return JSON.parse(value as string)
        }
        return value
    }

    public setSetting(name: string, value: any) {
        if (!this.settings)
            return

        if (name === "rows") {
            this.settings[name] = JSON.stringify(value) as any
        } else {
            this.settings[name] = value
        }

        if (!this.settingsId)
            return
        const doc = this.firestore.doc<Settings>(`settings/${this.settingsId}`)
        doc.update(this.settings)
    }

    public async signIn() {
        const provider = new GoogleAuthProvider()
        await this.auth.signInWithPopup(provider).catch(this.handleError)
    }

    public signOut() {
        this.auth.signOut().catch(this.handleError)
    }

    private onAuthStateChanged(user: any, self: SettingsService) {
        if (!user)
            return

        const settingsCollection = self.firestore.collection<Settings>("settings", (ref) => ref.where("uid", "==", user.uid).limit(1))
        settingsCollection.snapshotChanges().subscribe((actions) => {
            actions.map((action) => {
                const doc = action.payload.doc
                self.settingsId = doc.id
                self.settings = doc.data()

                self.ready.emit(true)
                const location = self.router.url
                self.router.navigate(["/"], {skipLocationChange: true}).then(() => {
                    self.router.navigate([location]);
                })
            })
        })
    }

    public registerAuthListener(callback: any) {
        this.auth.onAuthStateChanged((user) => callback(user, this)).catch(this.handleError)
    }

    private handleError(error: any) {
        console.error("Error:", error)
    }
}
