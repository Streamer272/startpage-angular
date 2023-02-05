import {AfterViewInit, Component} from '@angular/core';
import axios from "axios";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements AfterViewInit {
    temp: string = ""

    constructor(private cookieService: CookieService) {
    }

    ngAfterViewInit() {
        this.getWeather()
    }

    public getWeather() {
        if (this.cookieService.check("temp")) {
            this.temp = `${this.cookieService.get("temp")} °C`
            return
        }

        navigator.geolocation.getCurrentPosition(async (data) => {
            // success
            await this.loadWeather(data.coords.latitude, data.coords.longitude)
        }, async () => {
            // error
            const location = await axios.get("https://www.geolocation-db.com/json/")
            if (location.status !== 200 || location.data?.latitude === undefined || location.data?.longitude === undefined)
                return

            await this.loadWeather(location.data.latitude, location.data.longitude)
        })
    }

    public async loadWeather(latitude?: number, longitude?: number) {
        if (latitude === undefined || longitude === undefined)
            return

        const weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`)
        if (weather.status !== 200 || weather.data?.current_weather?.temperature === undefined)
            return

        this.temp = `${Math.floor(weather.data.current_weather.temperature)} °C`
        const expires = new Date()
        expires.setHours(expires.getHours() + 1)
        this.cookieService.set("temp", JSON.stringify(weather.data.current_weather.temperature), expires)
    }
}
