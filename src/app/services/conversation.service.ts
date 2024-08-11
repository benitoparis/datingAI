import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Conversation, FAKE_CONVERSATIONS } from '../models/conversation.model';
import { User } from '../models/user.model';
import {
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'conversations');
  conversations$ = collectionData(this.collection, {
    idField: 'id',
  }) as Observable<Conversation[]>;

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
    // this.conversations$.subscribe((conversations) => {
    //   const updatedVonversations = conversations.map((conversation) => {
    //     if (conversation.id === conversationId) {
    //       return {
    //         ...conversation,
    //         messages: [
    //           ...conversation.messages,
    //           {
    //             id: '',
    //             conversationId,
    //             senderId,
    //             content: msg,
    //             timestamp: new Date(),
    //           },
    //         ],
    //       };
    //     } else {
    //       return conversation;
    //     }
    //   });
    //   this.conversations$.next(updatedVonversations);
    // });
  }

  //

  // createConversation(userId: string, virtualProfileId: string) {
  //   const conversationId = this.firestore.createId();
  //   const conversation: Conversation = {
  //     id: conversationId,
  //     userId,
  //     virtualProfileId,
  //   };
  //   return this.firestore
  //     .collection('conversations')
  //     .doc(conversationId)
  //     .set(conversation);
  // }

  // getConversationsForUser(userId: string) {
  //   // return this.firestore
  //   //   .collection<Conversation>('conversations', (ref) =>
  //   //     ref.where('userId', '==', userId)
  //   //   )
  //   //   .valueChanges();

  //   // get a reference to the user-profile collection
  //   const conversationsCollection = collection(this.firestore, 'conversations');

  //   // get documents (data) from the collection using collectionData
  //   return conversationsCollection;
  // }

  getUserConversations(userId: string) {
    // get a reference to the user-profile collection
    const conversationsCollection = collection(this.firestore, 'conversations');

    const q = query(conversationsCollection, where('userId', '==', userId));

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Conversation[]>;
  }
}
