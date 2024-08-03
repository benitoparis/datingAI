import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        width: 100vw;
        padding: 10px 20px;
        text-align: center;
        //background-color: #e6e6fa;
      }
    `,
  ],
})
export class AppComponent {}
