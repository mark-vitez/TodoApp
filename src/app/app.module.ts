import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { HeaderComponent } from "./nav/header/header.component";
import { AuthenticationComponent } from "./components/authentication/authentication.component";
import { RegistrationComponent } from "./components/authentication/registration/registration.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { TodoListCardComponent } from "./components/main-page/todo-list-card/todo-list-card.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TaskCardComponent } from "./components/todo-list/task-card/task-card.component";
import { CreateTaskComponent } from "./components/todo-list/create-task/create-task.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { CreateListComponent } from "./components/main-page/create-list/create-list.component";
import { GlobalErrorHandler } from "./services/error.handler";
import { MessageService } from "./services/message.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AuthenticationComponent,
    RegistrationComponent,
    MainPageComponent,
    TodoListComponent,
    TodoListCardComponent,
    TaskCardComponent,
    CreateTaskComponent,
    CreateListComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
