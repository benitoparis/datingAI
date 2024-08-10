import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assurez-vous d'importer votre interface User
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fireBaseAuth = inject(Auth);
  user$ = user(this.fireBaseAuth);
  currentUserSig = signal<any | undefined>(undefined);

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

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    console.log('register');
    const promise = createUserWithEmailAndPassword(
      this.fireBaseAuth,
      email,
      password
    ).then((response) => {
      console.log('response', response);

      updateProfile(response.user, { displayName: username });
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireBaseAuth,
      email,
      password
    ).then(() => {});

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.fireBaseAuth);
    return from(promise);
  }
}
