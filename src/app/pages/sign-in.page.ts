import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  template: `
    <div class="sign-in-container">
      <div class="sign-in-form">
        <h2>Sign In</h2>
        <form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
          <div class="form-field">
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" />
            <div
              *ngIf="
                signInForm.get('email')?.invalid &&
                signInForm.get('email')?.touched
              "
              class="error"
            >
              Please enter a valid email.
            </div>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" />
            <div
              *ngIf="
                signInForm.get('password')?.invalid &&
                signInForm.get('password')?.touched
              "
              class="error"
            >
              Password must be at least 6 characters long.
            </div>
          </div>

          <button type="submit" [disabled]="signInForm.invalid">Sign In</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./sign-in.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export default class SignInPageComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      // Gestion de la connexion, par exemple en appelant un service d'authentification
      console.log(this.signInForm.value);

      const { email, password } = this.signInForm.value;

      this.authService
        .login(email, password)
        .pipe(
          catchError((err) => {
            console.log('error occured while login', err);
            return of(null);
          })
        )
        .subscribe((data: any) => {
          console.log('login', data);

          this.router.navigateByUrl('/conversations/1');
        });
    }
  }
}
