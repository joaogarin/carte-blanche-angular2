/*
 * Angular 2 decorators and services
 */
import {Component, Output, EventEmitter} from '@angular/core';

/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-randomize-button',
    styles: [`
    .randomize-button {
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
      font-size: 10px;
      text-transform:uppercase;
      font-size: .8rem;
      font-weight: 300;
      background: #282830;
      padding: 10px; 20px;
      box-shadow: 1px 0px 3px rgba(0,0,0,0.5);
      border: none;
      border-radius: 3px;
      color: white;
    }
    `],
    template: `<button class="randomize-button" (click)="selectRandom()"><ng-content></ng-content></button>`,
})
export class RandomizeButtonComponent {
    @Output() randomize = new EventEmitter();
    constructor() {
    }

    selectRandom() {
        this.randomize.emit('randomize');
    }
}
