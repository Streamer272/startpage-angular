import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwitchComponent} from './switch/switch.component';
import {SelectComponent} from './select/select.component';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        TimeComponent,
        WeatherComponent,
        LoadingComponent,
        ShortcutComponent,
        SettingsComponent,
        HomeComponent,
        SwitchComponent,
        SelectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
