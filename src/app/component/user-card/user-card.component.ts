import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-card',
  template: `
    <div *ngIf="user" class="user-card">
      <img [src]="user?.image" [alt]="user?.surname" class="user-image" />
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
