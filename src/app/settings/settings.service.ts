import {EventEmitter, Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Router} from "@angular/router";

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
    private settingsId?: string
    private settings?: Settings

    public ready: EventEmitter<boolean> = new EventEmitter<boolean>()
    public update: EventEmitter<boolean> = new EventEmitter<boolean>()
    public OPTIONS = SETTINGS_OPTIONS

    constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) {
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
        doc.update(this.settings).catch(this.handleError)
    }

    public async signIn() {
        const provider = new GoogleAuthProvider()
        await this.auth.signInWithPopup(provider).then((result) => {
            if (!result.additionalUserInfo?.isNewUser)
                return

            const settings = SETTINGS_DEFAULT
            settings.uid = result.user?.uid!!
            this.firestore.collection<Settings>("settings").add(settings).catch(this.handleError)
        }).catch(this.handleError)
    }

    public signOut() {
        this.auth.signOut().catch(this.handleError)
    }

    private onAuthStateChanged(user: any, self: SettingsService) {
        if (!user) {
            self.settings = SETTINGS_DEFAULT
            self.ready.emit(true)
            self.update.emit()
            return
        }

        const settingsCollection = self.firestore.collection<Settings>("settings", (ref) => ref.where("uid", "==", user.uid).limit(1))
        settingsCollection.snapshotChanges().subscribe((actions) => {
            actions.map((action) => {
                const doc = action.payload.doc
                self.settingsId = doc.id
                self.settings = doc.data()

                self.ready.emit(true)
                self.update.emit()
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
