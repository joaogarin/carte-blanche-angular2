/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

// Import styles variables
import { styleVars } from '../../../styles';

/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-button',
    styles: [`
    .base {
        cursor: pointer;
        background-color: transparent;
        border: none;
        font-size: 1rem;
    }

    .primary {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        font-size: 10px;
        text-transform:uppercase;
        font-size: .8rem;
        font-weight: 300;
        background: ${styleVars.primaryColor};
        padding: 10px; 20px;
        box-shadow: 1px 0px 3px rgba(0,0,0,0.5);
        border: none;
        border-radius: 3px;
        color: white;
    }
    `],
    template: `<button class="base" [ngClass]="getButtonClasses()" [disabled]="disabled"><ng-content></ng-content></button>`,
})
export class ButtonComponent {
    @Input() buttonType: string;
    @Input() disabled: boolean = false;

    constructor() {

    }

    getButtonClasses() {
        return {
            'primary': this.buttonType === 'primary'
        };
    }
}
