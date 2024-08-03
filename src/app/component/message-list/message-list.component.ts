import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/messages-list.models';

@Component({
  standalone: true,
  selector: 'app-message-list',
  template: `
    <div class="chat-container">
      <div class="message" *ngFor="let message of messages">
        <p>{{ message.content }}</p>
        <small>{{ message.timestamp | date : 'short' }}</small>
      </div>
    </div>
  `,
  styleUrls: ['./message-list.component.css'],
  imports: [CommonModule, NgIf, NgFor],
})
export class MessageListComponent {
  @Input() messages: Message[] = [];

  constructor() {}
}
