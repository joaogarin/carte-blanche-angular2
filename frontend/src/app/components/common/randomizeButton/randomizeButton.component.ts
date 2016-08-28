/*
 * Angular 2 decorators and services
 */
import {Component, Output, EventEmitter} from '@angular/core';

import { ButtonComponent } from './../index.ts';
/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-randomize-button',
    directives: [ButtonComponent],
    styles: [``],
    template: `<cb-button [buttonType]="buttonClass" (click)="selectRandom()"><ng-content></ng-content></cb-button>`,
})
export class RandomizeButtonComponent {
    @Output() randomize = new EventEmitter();
    buttonClass: string;

    constructor() {
        this.buttonClass = 'primary';
    }

    selectRandom() {
        this.randomize.emit('randomize');
    }
}
