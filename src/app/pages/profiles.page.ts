import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserListComponent } from '../component/user-list/user-list.component';

@Component({
  selector: 'app-profiles',
  standalone: true,
  template: `
    <div class="container">
      profile page
      <app-user-list></app-user-list>
    </div>
  `,
  styleUrls: ['./profiles.css'],
  imports: [CommonModule, ReactiveFormsModule, UserListComponent],
})
export default class ProfilesPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((user) => {
          if (user === null) this.router.navigate(['/']);
        })
      )
      .subscribe((user) => {
        console.log('user in profiles', user);
      });
  }
}
