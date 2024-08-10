import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/messages-list.models';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'messages');
  q = query(this.collection, where('conversationId', '==', 'CA'));

  messages$ = collectionData(this.q, {
    idField: 'id',
  }) as Observable<Message[]>;

  constructor() {}

  getMessages(conversationId: string): Observable<Message[]> {
    // return this.firestore
    //   .collection<Message>(`conversations/${conversationId}/messages`, (ref) =>
    //     ref.orderBy('timestamp')
    //   )
    //   .valueChanges();

    const q = query(
      this.collection,
      where('conversationId', '==', conversationId)
    );

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Message[]>;
  }

  sendMessage(conversationId: string, senderId: string, content: string) {
    //const messageId = this.firestore.createId();
    const message: Message = {
      id: 'ERdBPhkFiQCosTXt4YtI',
      conversationId,
      senderId, // Peut être l'UID de l'utilisateur ou l'ID du profil virtuel
      content: content,
      timestamp: new Date().getTime(),
    };

    const messagesRef = doc(collection(this.firestore, 'messages'));

    setDoc(messagesRef, message).finally(() => {
      console.log('message ajouté');
    });
  }
}
