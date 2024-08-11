import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/messages-list.models';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { VirtualProfile } from '../models/virtualProfile.model';

@Injectable({
  providedIn: 'root',
})
export class VirtualProfileService {
  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'virtualProfiles');

  constructor() {}

  getVirtualProfils(): Observable<VirtualProfile[]> {
    const q = query(this.collection);

    return collectionData(q, {
      idField: 'id',
    }) as Observable<VirtualProfile[]>;
  }
}
