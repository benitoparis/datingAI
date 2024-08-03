import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { InterlocutorDescriptionComponent } from '../../component/interlocutor-description/interlocutor-description.component';
import { UserListComponent } from '../../component/user-list/user-list.component';
import { MessageListComponent } from '../../component/message-list/message-list.component';
import { MessageInputComponent } from '../../component/message-input/message-input.component';
import { UserCardComponent } from '../../component/user-card/user-card.component';
import { UserService } from '../../services/user.service';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';
import { FAKE_MESSAGES, Message } from '../../models/messages-list.models';
import { User, USERS } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    AsyncPipe,
    InterlocutorDescriptionComponent,
    UserListComponent,
    MessageListComponent,
    MessageInputComponent,
    UserCardComponent,
    NgIf,
    NgFor,
  ],
  template: `
    <ng-container *ngIf="loggedUser">
      <div class="chat-container">
        <div class="left-column">
          <app-user-card [user]="currentInterlocutor"></app-user-card>

          <ng-container
            *ngIf="currentConversation$ | async as currentConversation"
          >
            <app-message-list
              [messages]="currentConversation.messages"
              [loggedUser]="loggedUser"
            ></app-message-list>
          </ng-container>

          <app-message-input
            (sendMessage)="onSendMessage($event)"
          ></app-message-input>
        </div>
        <div class="right-column">
          <app-user-list
            [users]="users"
            (selectUser)="onSelectUser($event)"
          ></app-user-list>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./conversation.css'],
  host: { hostID: crypto.randomUUID().toString() },
})
export default class ConversationPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  messages: Message[] = FAKE_MESSAGES;
  users: User[] = USERS;

  currentUser = 'user1';
  currentInterlocutor: User | null = null;
  currentConversation$ = new BehaviorSubject<Conversation | null>(null);

  loggedUser: User | null = null;

  readonly conversationId$ = this.route.paramMap.pipe(
    map((params) => {
      console.log('params', params);

      return params.get('conversationId');
    })
  );

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getLoggedUser();

    this.conversationId$.subscribe((conversationId) => {
      if (!conversationId) return;

      console.log('conversationId', conversationId);

      this.getCurrentConversation(conversationId);
    });

    this.userService.getUsers().subscribe((users) => (this.users = users));

    this.getCurrentInterlocutor();
  }

  onSendMessage(event: string) {}

  onSelectUser(event: Event) {}

  getCurrentConversation(conversationId: string) {
    this.conversationService
      .getConversations()
      .pipe(
        map((conversations) => {
          console.log('getConversations conversations', conversations);

          const foundConversation = conversations.find(
            (conversation) => conversation.id === conversationId
          );

          console.log('foundConversation', foundConversation);

          return foundConversation;
        })
      )
      .subscribe((foundConversation) => {
        if (foundConversation)
          this.currentConversation$.next(foundConversation);
      });
  }

  getCurrentInterlocutor() {
    this.currentConversation$.subscribe((currentConversation) => {
      console.log('currentConversation!!', currentConversation);
      const foundInterlocutor = this.users.find((user) => {
        return user.id === currentConversation?.user2;
      });

      console.log('this.users', this.users);

      console.log('foundInterlocutor', foundInterlocutor);

      if (foundInterlocutor) this.currentInterlocutor = foundInterlocutor;
    });
  }

  getLoggedUser() {
    this.authService.getAuthUser().subscribe((authUser) => {
      console.log('authUser', authUser);
      this.loggedUser = authUser;
    });
  }
}
