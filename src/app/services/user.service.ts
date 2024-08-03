import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, USERS } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers$ = new BehaviorSubject<User[] | []>(USERS);

  constructor() {}

  getUsers() {
    return this.allUsers$;
  }
}
