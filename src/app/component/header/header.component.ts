import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-title">
        <h1>MonSite</h1>
      </div>
      <nav class="header-links">
        <a href="/how-it-works">Comment ça fonctionne?</a>
        <a href="/register" *ngIf="!user">S'inscrire</a>
        <a href="/sign-in" *ngIf="!user">Se connecter</a>
        <a href="#" *ngIf="user" (click)="logoutEmitter.emit()"
          >Se déconnecter</a
        >
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false; // Remplacez par votre logique d'authentification réelle

  @Input() user: any | null;
  @Output() logoutEmitter = new EventEmitter();

  toggleAuthentication() {
    this.isAuthenticated = !this.isAuthenticated;
  }

  ngOnInit(): void {
    console.log('user in HeaderComponent', this.user);
  }
}
