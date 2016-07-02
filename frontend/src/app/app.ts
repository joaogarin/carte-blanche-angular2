/*
 * Angular 2 decorators and services
 */
import {Component} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'cb-app', // <app></app>
    // The template for our app
    template: `
    <div>Application</div>
    `
})
export class AppComponent {

}
