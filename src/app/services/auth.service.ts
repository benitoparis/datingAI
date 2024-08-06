import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assurez-vous d'importer votre interface User

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // Pour démonstration, définissez un utilisateur fictif
    const fakeUser: User = {
      id: 'user1',
      surname: 'Alice',
      gender: 'female',
      status: 'connected',
      description:
        'Amatrice de randonnées et de cuisine exotique. Toujours prête à découvrir de nouvelles cultures.',
      city: 'Paris',
      zipCode: 75001,
      image: '',
    };
    this.authUser$.next(fakeUser);
  }

  getAuthUser(): Observable<User | null> {
    return this.authUser$;
  }
}
