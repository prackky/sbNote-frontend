import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {AlertService} from '../core/alert.service';
import {TokenStorage} from '../core/token.storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private alertService: AlertService, private router: Router, public dialog: MatDialog, private token: TokenStorage) {
  }

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  
  ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userid: ['', [Validators.required, this.noWhitespaceValidator]],
            password: ['', Validators.required]
        });
        
        // reset login status
        //this.authService.signOut();
    }
    
    
  get f() { return this.loginForm.controls; }
  
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  login(): void {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
            return;
        }
    
    console.log("Form Submitted!");
    this.loading = true;
    this.authService.attemptAuth(this.f.userid.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['note']);
      },
      error => {
            this.alertService.error(error);
            this.loading = false;
      });
  }

}