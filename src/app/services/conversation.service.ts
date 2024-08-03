import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
