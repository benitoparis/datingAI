import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-interlocutor-description',
  template: ` <p>interlocutor-description works!</p> `,
  styleUrls: ['./interlocutor-description.component.css'],
  imports: [CommonModule, NgIf, NgFor],
})
export class InterlocutorDescriptionComponent implements OnInit {
  @Input() interlocutor: {
    name: string;
    status: string;
  } = {
    name: '',
    status: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
