/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ElementRef} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: '.cb-angular', // <app></app>
    // The template for our app
    template: `
    <div>Name of the component : {{componentName}}</div>
    <div>Path of the component : {{componentPath}}</div>
    `
})
export class AppComponent implements OnInit {
    componentName: string;
    componentPath: string;

    constructor(private _ref: ElementRef) {
        let nativeElement = this._ref.nativeElement;
        this.componentName = nativeElement.getAttributeNode("data-component").value;
        this.componentPath = nativeElement.getAttributeNode("data-component-path").value;
    }

    ngOnInit() {
    }
}
