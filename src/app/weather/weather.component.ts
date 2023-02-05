import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import axios from "axios";

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements AfterViewInit {
    @ViewChild("temp", {static: false}) tempElement?: ElementRef
    loading: boolean = true

    ngAfterViewInit() {
        this.getWeather()
    }

    public getWeather() {
        navigator.geolocation.getCurrentPosition(async (data) => {
            await this.loadWeather(data.coords.latitude, data.coords.longitude)
        }, async () => {
            const location = await axios.get("https://www.geolocation-db.com/json/")
            if (location.status === 200 && location.data?.latitude !== undefined && location.data?.longitude !== undefined)
                await this.loadWeather(location.data.latitude, location.data.longitude)
            else
                this.loading = false
        })
    }

    public async loadWeather(latitude?: number, longitude?: number) {
        if (latitude === undefined || longitude === undefined) {
            this.loading = false
            return
        }

        const weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`)
        this.loading = false;
        if (weather.status === 200 && weather.data?.current_weather?.temperature !== undefined)
            this.tempElement!!.nativeElement.innerText = `${Math.floor(weather.data.current_weather.temperature)} °C`
    }
}
