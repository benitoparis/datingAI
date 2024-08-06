import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

import { Conversation, FAKE_CONVERSATIONS } from '../models/conversation.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  conversations$ = new BehaviorSubject<Conversation[] | []>(FAKE_CONVERSATIONS);

  constructor() {}

  selectUser(user: User): void {
    this.selectedUserSubject.next(user);
  }

  getSelectedUser() {
    return this.selectedUser$;
  }

  clearSelectedUser(): void {
    this.selectedUserSubject.next(null);
  }

  getConversations() {
    return this.conversations$;
  }

  addMessage(msg: string, conversationId: string, senderId: string) {
    this.conversations$.subscribe((conversations) => {
      const updatedVonversations = conversations.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                id: '',
                conversationId,
                senderId,
                content: msg,
                timestamp: new Date(),
              },
            ],
          };
        } else {
          return conversation;
        }
      });

      this.conversations$.next(updatedVonversations);
    });
  }
}
