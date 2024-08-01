import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h2>Conversation</h2>

    ID: {{ conversationId$ | async }}
  `,
})
export default class ConversationPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly conversationId$ = this.route.paramMap.pipe(
    map((params) => params.get('conversationId'))
  );
}
