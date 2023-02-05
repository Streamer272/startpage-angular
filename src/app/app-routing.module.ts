import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "settings", component: SettingsComponent},
    {path: "**", redirectTo: "/"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
