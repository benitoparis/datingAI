import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/messages-list.models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private firestore: AngularFirestore) {}

  getMessages(conversationId: string): Observable<Message[]> {
    return this.firestore
      .collection<Message>(`conversations/${conversationId}/messages`, (ref) =>
        ref.orderBy('timestamp')
      )
      .valueChanges();
  }

  sendMessage(conversationId: string, senderId: string, content: string) {
    const messageId = this.firestore.createId();
    const message: Message = {
      id: messageId,
      conversationId,
      senderId, // Peut être l'UID de l'utilisateur ou l'ID du profil virtuel
      content: content,
      timestamp: new Date().getTime(),
    };

    return this.firestore
      .collection(`conversations/${conversationId}/messages`)
      .doc(messageId)
      .set(message);
  }
}
