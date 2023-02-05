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
    weatherImage?: string = undefined

    constructor(private cookieService: CookieService) {
    }

    ngAfterViewInit() {
        this.getWeather()
    }

    private getWeather(useCookies: boolean = true) {
        if (this.cookieService.check("temp") && useCookies) {
            setTimeout(() => {
                this.temp = this.cookieService.get("temp")
                this.weatherImage = this.cookieService.get("weatherImage")
            }, 800)
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

    private async loadWeather(latitude?: number, longitude?: number) {
        if (latitude === undefined || longitude === undefined)
            return

        const weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`)
        if (weather.status !== 200 || weather.data?.current_weather?.temperature === undefined)
            return

        this.temp = `${Math.floor(weather.data.current_weather.temperature)} °C`
        this.weatherImage = this.getImageFromWeatherCode(weather.data.current_weather.weathercode)
        const expires = new Date()
        expires.setHours(expires.getHours() + 1)
        this.cookieService.set("temp", this.temp, expires)
        this.cookieService.set("weatherImage", this.weatherImage || "", expires)
    }

    private getImageFromWeatherCode(code: number): string | undefined {
        const prefix = "/assets/images/"

        console.log("checking ", code)
        if (0 <= code && code <= 5)
            return prefix + "sunny.png"
        else if (6 <= code && code <= 19)
            return prefix + "clouds.png"
        else if (20 <= code && code <= 29)
            return prefix + "rain.png"
        else if (30 <= code && code <= 49)
            return prefix + "clouds.png"
        else if (50 <= code && code <= 69)
            return prefix + "rain.png"
        else if (70 <= code && code <= 79)
            return prefix + "snow.png"
        else if (80 <= code && code <= 99)
            return prefix + "rain.png"
        else
            return undefined
    }
}
