/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ElementRef, Injector} from '@angular/core';
import * as path from 'path';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'cb-iframe', // <app></app>
    // The template for our app
    template: `<iframe scrolling="no" frameBorder="0" style="width: '100%', height: '100%'"></iframe>
  `
})
export class IframeComponent implements OnInit {
    @Input() basePath: string;
    userBundle: string;
    element: HTMLElement;
    iframe: any;

    constructor(private _ref: ElementRef) {
    }

    ngOnInit() {
        //console.log(this.basePath);
        //this.userBundle = path.join(this.basePath, 'user-bundle.js');
        this.userBundle = '';
        this.element = this._ref.nativeElement;
        this.iframe = this.element.children[0];
        console.log(this.iframe);
        const doc = this.iframe.contentDocument;
        doc.open();
        // eslint-disable-next-line max-len
        doc.write(this.createHTML(this.userBundle));
        doc.close();
    }

    createHTML(userbundle) {
        return `<!DOCTYPE html>
    <html style="height: 100%; width: 100%; margin: 0; padding: 0;">
        <head>
        </head>
        <body style="height: 100%; width: 100%; margin: 0; padding: 0;">
        <div
            id="root"
            style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            ">
        <cb-app>
            <div class="new-element">
                <cb-button [text]="Loading Component" [isRed]="false"></cb-button>
            </div>
        </cb-app>
        
        </div>
            <script type="text/javascript" src="http://localhost:3000/main.js"></script></body>
        </body>
    </html>`;
    }
}