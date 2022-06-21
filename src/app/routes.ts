import { Routes } from "@angular/router";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { LoginGuard } from "./guards/login.guard";

export const routes: Routes = [
    {
        path: "home", component: MainPageComponent
    },
    {        
        path: "login", component: AuthenticationComponent, canActivate: [LoginGuard]
    },
    {
        path: "**", component: MainPageComponent
    }
];