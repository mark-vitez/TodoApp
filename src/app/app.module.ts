import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeaderComponent } from './nav/header/header.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TodoListCardComponent } from './components/main-page/todo-list/todo-list-card.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TaskCardComponent } from './components/todo-list/task-card/task-card.component';


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
    ConfirmationDialogComponent,
    SpinnerComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
