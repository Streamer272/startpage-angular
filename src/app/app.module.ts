import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {TimeComponent} from './time/time.component';
import {WeatherComponent} from './weather/weather.component';
import {LoadingComponent} from './loading/loading.component';
import {CookieService} from "ngx-cookie-service";
import {ShortcutComponent} from './shortcut/shortcut.component';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        TimeComponent,
        WeatherComponent,
        LoadingComponent,
        ShortcutComponent,
        SettingsComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
