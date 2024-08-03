import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-card',
  template: `
    <div *ngIf="user" class="user-card">
      @if (user.image) {
      <img [src]="user?.image" [alt]="user?.surname" class="user-image" />
      } @else {
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" fill="#e0e0e0" />
        <circle cx="50" cy="35" r="15" fill="#9e9e9e" />
        <rect
          x="25"
          y="55"
          width="50"
          height="25"
          rx="10"
          ry="10"
          fill="#9e9e9e"
        />
      </svg>
      }

      <div class="user-info">
        <h4>{{ user?.surname }}</h4>
        <p>{{ user?.city }}</p>
        <p>Status: {{ user?.status }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./user-card.component.css'],
  imports: [CommonModule, NgIf, NgFor],
})
export class UserCardComponent implements OnInit {
  @Input() user: User | null = null;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.getSelectedUser().subscribe((selectedUser) => {
      console.log('selectedUser', selectedUser);
    });
  }
}
