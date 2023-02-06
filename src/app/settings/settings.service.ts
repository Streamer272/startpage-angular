import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private settings: Map<string, any> = new Map<string, any>()

    constructor() {
    }

    public getSetting(name: string): any {
        return this.settings.get(name)
    }

    public setSetting(name: string, value: any) {
        this.settings.set(name, value)
    }
}
