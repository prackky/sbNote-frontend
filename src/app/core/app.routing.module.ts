import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteComponent} from '../note/note.component';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {RegisterSuccessComponent} from '../register-success/register-success.component';

const routes: Routes = [
  { path: 'note', component: NoteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success/:userId', component: RegisterSuccessComponent },
  { path : '', component : NoteComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }