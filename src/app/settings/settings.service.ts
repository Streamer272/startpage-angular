import {Injectable} from "@angular/core";
import {newShortcut, newWeather} from "../tile";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/compat/firestore';
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
    ROWS = "rows"
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

@Injectable({
    providedIn: "root"
})
export class SettingsService {
    private settings: Settings = {
        // intro
        enableIntro: true,
        enableGreeting: false,
        // time
        enableTime: true,
        showSeconds: false,
        hourFormat: SETTINGS_OPTIONS[SettingsKeys.HOUR_FORMAT][0],
        // date
        enableDate: true,
        dayFormat: SETTINGS_OPTIONS[SettingsKeys.DAY_FORMAT][0],
        monthFormat: SETTINGS_OPTIONS[SettingsKeys.MONTH_FORMAT][0],
        yearFormat: SETTINGS_OPTIONS[SettingsKeys.YEAR_FORMAT][0],
        // search
        enableSearch: true,
        // rows
        rows: []
    }
    public OPTIONS = SETTINGS_OPTIONS

    private settingsCollection?: AngularFirestoreCollection<Settings>
    private ready: Function = () => {
    }

    constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
        this.registerAuthListener(this.onAuthStateChanged)

        // rows
        this.setSetting("rows", [
            [
                newWeather(),
                newShortcut("https://www.google.com", "Google", "https://www.google.com/favicon.ico", "https://github.com", "GitHub", "https://github.com/favicon.ico"),
                newShortcut("https://reddit.com", "Reddit", "https://reddit.com/favicon.ico")
            ]
        ])
    }

    public getSetting(name: SettingsKeys | string): any {
        const value = this.settings[name]
        if (name === SettingsKeys.ROWS) {
            return JSON.parse(value as string)
        }
        return value
    }

    public setSetting(name: SettingsKeys | string, value: any) {
        if (name === SettingsKeys.ROWS) {
            this.settings[name] = JSON.stringify(value) as any
        } else {
            this.settings[name] = value
        }
    }

    public async signIn() {
        const provider = new GoogleAuthProvider()
        await this.auth.signInWithPopup(provider).catch(this.handleError)
    }

    public signOut() {
        this.auth.signOut()
    }

    private onAuthStateChanged(user: any, self: SettingsService) {
        console.log("User change detected:", user)
        if (!user)
            return

        self.settingsCollection = self.firestore.collection<Settings>("settings", (ref) => ref.where("uid", "==", user.uid).limit(1))
        self.settingsCollection.snapshotChanges().subscribe((actions) => {
            actions.map((doc) => {

            })
        })
        const fsSettings = self.settingsCollection.valueChanges()
        fsSettings.subscribe((settings: Settings[]) => {
            console.log("Settings change detected:", settings[0])
            self.settings = settings[0]
            this.ready()
            const location = self.router.url
            self.router.navigate(["/"], {skipLocationChange: true}).then(() => {
                self.router.navigate([location]);
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
