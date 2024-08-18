import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { VirtualProfile } from 'src/app/models/virtualProfile.model';

@Component({
  standalone: true,
  selector: 'app-user-card',
  template: `
    <div *ngIf="virtualProfile" class="user-card">
      <div class="user-info">
        <h4>{{ virtualProfile?.nickName }}</h4>
        <p>{{ virtualProfile?.description }}</p>
      </div>
      <img src="/src/app/images/photo1.png" with="150" height="150" />
    </div>
  `,
  styleUrls: ['./user-card.component.css'],
  imports: [CommonModule, NgIf, NgFor],
})
export class UserCardComponent implements OnInit {
  @Input() virtualProfile: VirtualProfile | null = null;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    console.log('ngOnInit virtualProfil', this.virtualProfile);
    this.conversationService.getSelectedUser().subscribe((selectedUser) => {
      console.log('selectedUser', selectedUser);
    });
  }
}
