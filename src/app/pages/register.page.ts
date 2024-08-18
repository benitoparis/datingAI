import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <div class="register-container">
      <div class="register-content">
        <div class="register-info">
          <h2>Join Us</h2>
          <p>
            Welcome to our community! By creating an account, you will gain
            access to exclusive content, special offers, and more. Please fill
            in the form to create your account.
          </p>
        </div>
        <div class="register-form">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              <div
                *ngIf="
                  registerForm.get('email')?.invalid &&
                  registerForm.get('email')?.touched
                "
                class="error"
              >
                Please enter a valid email.
              </div>
            </div>

            <div class="form-field">
              <label for="username">Username</label>
              <input id="username" type="text" formControlName="username" />
              <div
                *ngIf="
                  registerForm.get('username')?.invalid &&
                  registerForm.get('username')?.touched
                "
                class="error"
              >
                Username is required.
              </div>
            </div>

            <div class="form-field">
              <label for="gender">Gender</label>
              <select id="gender" formControlName="gender">
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div
                *ngIf="
                  registerForm.get('gender')?.invalid &&
                  registerForm.get('gender')?.touched
                "
                class="error"
              >
                Please select your gender.
              </div>
            </div>

            <div class="form-field">
              <label for="password">Password</label>
              <input id="password" type="password" formControlName="password" />
              <div
                *ngIf="
                  registerForm.get('password')?.invalid &&
                  registerForm.get('password')?.touched
                "
                class="error"
              >
                Password must be at least 6 characters long.
              </div>
            </div>

            <button type="submit" [disabled]="registerForm.invalid">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.css'],
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
})
export default class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Ici, vous pouvez gérer l'envoi du formulaire, par exemple en appelant un service

      const { email, username, gender, password } = this.registerForm.value;

      this.authService
        .register(email, username, password)
        .pipe(
          catchError((err) => {
            console.log('error occured while creating a new user', err);
            return of(null);
          })
        )
        .subscribe((data: any) => {
          console.log('data', data);

          // this.router.navigateByUrl('/');
        });
    }
  }
}
