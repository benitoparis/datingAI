import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
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
import { LLMEndpointService } from '../../services/llm-endpoint.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { MessageService } from '../../services/message.service';
import { VirtualProfile } from '../../models/virtualProfile.model';
import { VirtualProfileService } from '../../services/virtual-profiles.service';

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
    FirestoreModule,
  ],
  template: `
    <ng-container *ngIf="loggedUser">
      <div class="chat-container">
        <div class="chat">
          <ng-container *ngIf="virtualProfile">
            <app-user-card [virtualProfile]="virtualProfile"></app-user-card>
          </ng-container>

          <ng-container *ngIf="messages$ | async as messages">
            <app-message-list
              [messages]="messages"
              [loggedUser]="loggedUser"
            ></app-message-list>
          </ng-container>

          <app-message-input
            (sendMessage)="onSendMessage($event)"
          ></app-message-input>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./conversation.css'],
  host: { hostID: crypto.randomUUID().toString() },
})
export default class ConversationPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  messages$ = new BehaviorSubject<Message[] | null>(null);
  users: User[] = USERS;

  currentUser = 'user1';
  currentInterlocutor: User | null = null;
  currentConversation$ = new BehaviorSubject<Conversation | null>(null);

  loggedUser: User | null | any = null;
  virtualProfile: VirtualProfile;

  userConversations$ = new BehaviorSubject<Conversation[] | null>(null);

  readonly conversationId$ = this.route.paramMap.pipe(
    map((params) => {
      console.log('params', params);

      return params.get('conversationId');
    })
  );

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private llmEndpointService: LLMEndpointService,
    private messageService: MessageService,
    private virtualProfilsService: VirtualProfileService
  ) {}

  ngOnInit() {
    this.getLoggedUser();

    this.conversationService.conversations$.subscribe((conv) =>
      console.log('conv')
    );

    // this.messageService.messages$.subscribe((message) =>
    //   console.log('message', message)
    // );

    this.conversationId$
      .pipe(
        filter(Boolean),
        switchMap((conversationId) => {
          return this.messageService.getMessages(conversationId);
        })
      )
      .subscribe((messagesByConversationId) => {
        this.messages$.next(
          messagesByConversationId.sort(
            (msg1, msg2) => msg1.timestamp - msg2.timestamp
          )
        );
      });

    this.getUserConversations();
    this.getCurrentConversation();
    this.getCurrentVirtualProfile();

    // this.conversationId$.subscribe((conversationId) => {
    //   if (!conversationId) return;

    //   console.log('conversationId', conversationId);

    //   this.getCurrentConversation(conversationId);
    // });

    //this.userService.getUsers().subscribe((users) => (this.users = users));

    //this.getCurrentInterlocutor();
  }

  onSendMessage(msg: string) {
    // Save in DB
    this.conversationId$
      .pipe(
        filter(Boolean),
        tap((conversationId) => {
          console.log('conversationId--', conversationId);
          this.messageService.sendMessage(
            conversationId,
            this.loggedUser.uid,
            msg
          );
        })
      )
      .subscribe((data) => {
        console.log('msg created');
      });

    this.llmEndpointService
      .postData({ msg, virtualProfile: this.virtualProfile })
      .pipe(
        delay(2000), // simulate 1 second before displaying the response
        withLatestFrom(this.conversationId$),
        tap(([msg, conversationId]) => {
          if (conversationId)
            this.messageService.sendMessage(
              conversationId,
              this.virtualProfile.id,
              msg.message
            );
        })
      )
      .subscribe((result) => {});
  }

  onSelectUser(event: Event) {}

  // getCurrentConversation(conversationId: string) {
  //   this.conversationService
  //     .getConversations()
  //     .pipe(
  //       map((conversations) => {
  //         console.log('getConversations conversations', conversations);

  //         const foundConversation = conversations.find(
  //           (conversation) => conversation.id === conversationId
  //         );

  //         console.log('foundConversation', foundConversation);

  //         return foundConversation;
  //       })
  //     )
  //     .subscribe((foundConversation) => {
  //       if (foundConversation)
  //         this.currentConversation$.next(foundConversation);
  //     });
  // }

  // getCurrentInterlocutor() {
  //   this.currentConversation$.subscribe((currentConversation) => {
  //     console.log('currentConversation!!', currentConversation);
  //     const foundInterlocutor = this.users.find((user) => {
  //       return user.id === currentConversation?.user2;
  //     });

  //     console.log('this.users', this.users);

  //     console.log('foundInterlocutor', foundInterlocutor);

  //     if (foundInterlocutor) this.currentInterlocutor = foundInterlocutor;
  //   });
  // }

  getLoggedUser() {
    // this.authService.getAuthUser().subscribe((authUser) => {
    //   console.log('authUser', authUser);
    //   this.loggedUser = authUser;
    // });
    this.authService.user$.subscribe((authUser) => {
      console.log('authUser', authUser);
      this.loggedUser = authUser;
    });
  }

  //getUserConversations() {
  // this.conversationId$.subscribe((conversationId) => {
  //   this.conversationService.getConversationsForUser(this.loggedUser.uid);
  //   const q = query(
  //     this.collection,
  //     where('conversationId', '==', conversationId)
  //   );
  //   return collectionData(q, {
  //     idField: 'id',
  //   }) as Observable<Message[]>;
  // });
  // this.authService.user$
  //   .pipe(
  //     map((user) => user.id),
  //     switchMap((userId) => {
  //       return this.conversationService.getConversationsForUser(userId);
  //     })
  //   )
  //   .subscribe((conversations) => {
  //     console.log('getUserConversations', conversations);
  //   });
  //}

  getUserConversations() {
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.conversationService.getUserConversations(user.uid);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((userConversations) => {
        //get current user conversations
        this.userConversations$.next(userConversations);
      });
  }

  getCurrentConversation() {
    combineLatest([this.userConversations$, this.conversationId$])
      .pipe(
        map(([userConversations, conversationId]) => {
          return userConversations?.filter(
            (conversation) => conversation.id === conversationId
          );
        })
      )
      .subscribe((currentConversation) => {
        if (currentConversation)
          this.currentConversation$.next(currentConversation[0]);
      });
  }

  getCurrentVirtualProfile() {
    this.currentConversation$
      .pipe(
        filter(Boolean),
        switchMap((currentConversation) => {
          if (currentConversation) {
            return this.virtualProfilsService.getVirtualProfils().pipe(
              map((virtualProfils) => {
                return virtualProfils.filter(
                  (virtualProfil) =>
                    virtualProfil.id === currentConversation.virtualProfileId
                );
              })
            );
          } else {
            return of([]);
          }
        })
      )
      .subscribe((virtualProfiles) => {
        console.log('virtualProfiles', virtualProfiles);

        if (virtualProfiles) {
          this.virtualProfile = virtualProfiles[0];
        }
      });
  }
}
