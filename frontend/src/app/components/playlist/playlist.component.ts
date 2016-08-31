/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnChanges } from '@angular/core';

import {DynamicOutlet} from './../dynamicOutlet/dynamicOutlet.component.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist',
    directives: [DynamicOutlet],
    styles: [`
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 1.5em auto;
        flex-direction: column;
        position: relative;
    }
  `],
    template: `<div class="wrapper">
        <cb-dynamic-outlet [update]="update" [componentPath]="componentPath" [component]="component"></cb-dynamic-outlet>
    </div>`,
})
export class Playlist implements OnChanges {
    @Input() component: any;
    @Input() componentPath: string;
    @Input() update: Object;

    constructor() {}

    ngOnChanges() {
        console.log('I have changed');
        this.update = Object.assign({}, this.update);
    }
}
