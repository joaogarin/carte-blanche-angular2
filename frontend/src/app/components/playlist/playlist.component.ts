/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnChanges } from '@angular/core';
import { CardComponent } from './../common/card/card.component.ts';
import {DynamicOutlet} from './../dynamicOutlet/dynamicOutlet.component.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist',
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

    .playground-card {
        width: 90%;
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        margin: 0 auto;
        padding: 1rem 0;
        background: white;
    }
    .title {
        font-size: 1.5em;
        font-weight: 300;
        margin: 0 0 0.5em 0;
    }
  `],
    template: `<div class="wrapper">
    <h2 class="title">{{variationData.name}}</h2>
    <div class="playground-card">
        <cb-card>
            <cb-dynamic-outlet [componentPath]="componentPath" [component]="component" [variationData]="variationData"></cb-dynamic-outlet>
        </cb-card>
    </div>
    </div>`,
})
export class Playlist implements OnChanges {
    @Input() component: any;
    @Input() componentPath: string;
    @Input() variationData: Object;

    constructor() {}

    ngOnChanges() {
        
    }
}
