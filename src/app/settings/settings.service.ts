import {Injectable} from "@angular/core";
import {newShortcut, newWeather} from "../tile";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "firebase/auth";

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

    constructor(public auth: AngularFireAuth) {
        this.registerAuthListener(this.onAuthStateChanged)

        // intro
        this.setSetting("enableIntro", true)
        this.setSetting("enableGreeting", false)

        // time
        this.setSetting("enableTime", true)
        this.setSetting("showSeconds", false)
        this.setSetting("hourFormat", this.OPTIONS["hourFormat"][0])

        // date
        this.setSetting("enableDate", true)
        this.setSetting("dayFormat", this.OPTIONS["dayFormat"][0])
        this.setSetting("monthFormat", this.OPTIONS["monthFormat"][0])
        this.setSetting("yearFormat", this.OPTIONS["yearFormat"][1])

        // search
        this.setSetting("enableSearch", true)

        // rows
        this.setSetting("rows", [
            [
                newWeather(),
                newShortcut("https://www.google.com", "Google", "https://www.google.com/favicon.ico", "https://github.com", "GitHub", "https://github.com/favicon.ico"),
                newShortcut("https://reddit.com", "Reddit", "https://reddit.com/favicon.ico")
            ]
        ])
    }

    public getSetting(name: string): any {
        return this.settings.get(name)
    }

    public setSetting(name: string, value: any) {
        this.settings.set(name, value)
    }

    public async signIn() {
        const provider = new GoogleAuthProvider()
        await this.auth.signInWithPopup(provider).catch(this.handleError)
    }

    public signOut() {
        this.auth.signOut()
    }

    private onAuthStateChanged(user: any) {
        console.log("User changed to", user, typeof user)
    }

    public registerAuthListener(callback: any) {
        this.auth.onAuthStateChanged(callback).catch(this.handleError)
    }

    private handleError(error: any) {
        console.error("Error:", error)
    }
}
