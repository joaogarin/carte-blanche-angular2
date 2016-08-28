/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit, ElementRef, DynamicComponentLoader, Injector } from '@angular/core';

import { PlaylistList } from './components/playlistList/playlistList.component.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: '.cb-angular', // <app></app>
    directives: [PlaylistList],
    // The template for our app
    template: `
    <cb-playlist-list [componentPath]="componentPath" [componentName]="componentName" [componentObj]="componentObj"></cb-playlist-list>
    `
})
export class AppComponent implements OnInit {
    componentName: string;
    componentPath: string;
    componentSource: string;
    compiledComponent: any;
    basePath: string;
    componentObj: Object;

    constructor(
        private _ref: ElementRef) {
        let nativeElement = this._ref.nativeElement;
        this.componentName = nativeElement.getAttributeNode("data-component").value;
        this.componentPath = nativeElement.getAttributeNode("data-component-path").value;
        this.componentSource = nativeElement.getAttributeNode("data-component-source").value;

        this.componentObj = JSON.parse(this.componentSource);
    }

    ngOnInit() {

    }
}
