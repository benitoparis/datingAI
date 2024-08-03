import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-message-input',
  template: `
    <div class="message-input">
      <input
        [(ngModel)]="message"
        (keyup.enter)="onSendMessage()"
        placeholder="Type your message here..."
      />
      <button (click)="onSendMessage()">Send</button>
    </div>
  `,
  styleUrls: ['./message-input.component.css'],
  imports: [CommonModule, NgIf, NgFor, FormsModule],
})
export class MessageInputComponent {
  message: string = '';
  @Output() sendMessage = new EventEmitter<string>();

  constructor() {}

  onSendMessage() {
    if (this.message.trim()) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}
