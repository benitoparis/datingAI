import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserCardComponent } from '../user-card/user-card.component';
import { User } from 'src/app/models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-list',
  template: `
    <ng-container *ngFor="let user of users">
      <app-user-card [user]="user"></app-user-card>
    </ng-container>
  `,
  styleUrls: ['./user-list.component.css'],
  imports: [UserCardComponent, CommonModule, NgIf, NgFor],
})
export class UserListComponent {
  @Input() users: User[] = []; // Remplace 'any' par le type de tes utilisateurs
  @Output() selectUser = new EventEmitter<any>();

  constructor() {}

  onSelectUser(user: any) {
    this.selectUser.emit(user);
  }
}
