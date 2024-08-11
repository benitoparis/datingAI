import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/messages-list.models';
import { User } from 'src/app/models/user.model';

@Component({
  standalone: true,
  selector: 'app-message-list',
  template: `
    <div class="chat-container">
      <div
        class="message"
        *ngFor="let message of messages"
        [ngClass]="{ loggerUser: message.senderId === loggedUser.uid }"
      >
        <p>{{ message.content }}</p>
        <small>{{ message.timestamp | date : 'short' }}</small>
      </div>
    </div>
  `,
  styleUrls: ['./message-list.component.css'],
  imports: [CommonModule, NgIf, NgFor],
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [];
  @Input() loggedUser: User;

  constructor() {}

  ngOnInit() {
    console.log('messages', this.messages);
    console.log('loggedUser', this.loggedUser);
  }
}
