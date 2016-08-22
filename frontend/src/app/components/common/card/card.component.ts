/*
 * Angular 2 decorators and services
 */
import {Component, Output} from '@angular/core';

/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-card',
    styles: [`
    .card {
        border: none;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 1px rgba(50,59,67,0.1);
        -moz-box-shadow: 0 1px 1px rgba(50,59,67,0.1);
        box-shadow: 0 1px 1px rgba(50,59,67,0.1);
        background-color: white;
        transition: box-shadow 150ms;
        position: relative;
        margin: 3em auto;
        }

        .card:hover {
        -webkit-box-shadow: 0 2px 2px rgba(50,59,67,0.1);
        -moz-box-shadow: 0 2px 2px rgba(50,59,67,0.1);
        box-shadow: 0 2px 2px rgba(50,59,67,0.1);
        }
    `],
    template: `<div class="card"><ng-content></ng-content></div>`,
})
export class CardComponent {
    constructor() {
    }
}
