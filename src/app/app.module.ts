import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from './note/note.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorDialogComponent } from './core/error-dialog.component';
import { NoteService } from "./core/note.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./core/auth.service";
import { AlertService } from "./core/alert.service";
import { Interceptor } from "./core/interceptor";
import { TokenStorage } from "./core/token.storage";
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    LoginComponent,
    ErrorDialogComponent,
    RegisterComponent,
    RegisterSuccessComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ErrorDialogComponent, NoteService, AuthService, AlertService, TokenStorage, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }