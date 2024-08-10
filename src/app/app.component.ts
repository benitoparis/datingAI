import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header (logoutEmitter)="logout()" [user]="user"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        width: 100vw;
        padding: 10px 20px;
        text-align: center;
        //background-color: #e6e6fa;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email,
          userName: user.displayName,
        });

        this.user = user;
        console.log('this.user AppComponent', this.user);
      } else {
        this.authService.currentUserSig.set(null);
      }

      console.log('currentUserSig', this.authService.currentUserSig());
    });
  }

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService
      .logout()
      .subscribe((logout) => console.log('logout', logout));
  }
}
