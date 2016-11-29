/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit, ElementRef, Injector } from '@angular/core';
import * as path from 'path';

import { VariationData } from './../../utils/index.ts';

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
    @Input() component: any;
    @Input() componentPath: string;
    @Input() variationData: VariationData;
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
        let componentDecorator = this.getDecoratorObject(this.component.componentDecorators[0].arguments.obj);
        let inputs = JSON.stringify(this.variationData.props);
        
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
        <cb-app style="display: none;"></cb-app>
        <cb-wrapper data-component='${componentDecorator.selector}' data-inputs='${inputs}'></cb-wrapper>
        </div>
            <script type="text/javascript">
                window.COMPONENT_PATH = '/${this.componentPath}';
            </script>
            <script type="text/javascript" src="http://localhost:3000/main.js"></script></body>
        </body>
    </html>`;
    }

    /**
     * Parse the decorator we get from typedoc and return the object associated with it. The decorator comes 
     * as a string and can contain comments that is why we use eval() and not JSON.parse().
     * 
     * @param {string} decoratorString
     * The string representation of the decorator
     * 
     * @TODO - Clean this up and try a better way of getting this info without using eval()
     * 
     */
    getDecoratorObject(decoratorString) {
        return eval("(" + decoratorString + ")");
    }
}