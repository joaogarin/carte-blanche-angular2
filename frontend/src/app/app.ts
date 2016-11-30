/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit, ElementRef, Injector } from '@angular/core';

import { PlaylistList } from './components/playlistList/playlistList.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: '.cb-angular', // <app></app>
    // The template for our app
    template: `
    <cb-playlist-list [frontendOptions]="frontendOptions" [componentPath]="componentPath" [componentName]="componentName" [componentObj]="componentObj"></cb-playlist-list>`
})
export class AppComponent implements OnInit {
    componentName: string;
    componentPath: string;
    componentSource: string;
    compiledComponent: any;
    frontendOptions: any;
    basePath: string;
    componentObj: Object;

    constructor(
        private _ref: ElementRef) {
        let nativeElement = this._ref.nativeElement;
        this.componentName = nativeElement.getAttributeNode("data-component").value;
        this.componentPath = nativeElement.getAttributeNode("data-component-path").value;
        this.componentSource = nativeElement.getAttributeNode("data-component-source").value;

        // DO JSON PARSE
        this.frontendOptions = nativeElement.getAttributeNode("data-frontend-options").value;

        this.componentObj = JSON.parse(this.componentSource);
    }

    ngOnInit() {

    }
}
