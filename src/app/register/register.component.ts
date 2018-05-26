import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {AlertService} from '../core/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5), this.noWhitespaceValidator]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
  get f() { return this.registerForm.controls; }
  
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
        return;
    }
    
    console.log("Form Submitted!");
    this.loading = true;
    this.authService.attemptRegister(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.alertService.success('Registration successful', true);
        /*this.token.saveToken(data.token);*/
        this.router.navigate(['register-success', data.userId]);
        },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
