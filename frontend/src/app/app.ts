/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ElementRef, DynamicComponentLoader, Injector} from '@angular/core';

import {IframeComponent} from './components/iframe/iframe.component.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: '.cb-angular', // <app></app>
    directives: [IframeComponent],
    // The template for our app
    template: `
    <cb-iframe [basePath]="basePath"></cb-iframe>
    `
})
export class AppComponent implements OnInit {
    componentName: string;
    componentPath: string;
    componentSource: string;
    compiledComponent: any;
    basePath: string;

    constructor(
        private _ref: ElementRef) {
        let nativeElement = this._ref.nativeElement;
        this.componentName = nativeElement.getAttributeNode("data-component").value;
        this.componentPath = nativeElement.getAttributeNode("data-component-path").value;
        this.componentSource = nativeElement.getAttributeNode("data-component-source").value;

        // TODO - Pass this from the plugin file
        this.basePath = 'http://localhost:3000/carte-blanche';
    }

    ngOnInit() {

    }
}
