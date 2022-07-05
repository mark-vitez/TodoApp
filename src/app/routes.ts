    import { Routes } from "@angular/router";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginGuard } from "./guards/login.guard";

export const routes: Routes = [
    {
        path: "home", component: MainPageComponent, canActivate: [AuthGuard]
    },    
    {        
        path: "login", component: AuthenticationComponent, canActivate: [LoginGuard]
    },
    {
        path: "todolist/:id", component: TodoListComponent
    },
    {
        path: "**", redirectTo: "home"
    }
];