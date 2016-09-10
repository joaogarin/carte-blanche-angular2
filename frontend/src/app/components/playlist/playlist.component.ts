/*
 * Angular 2 decorators and services
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from './../common/card/card.component.ts';
import {DynamicOutlet} from './../dynamicOutlet/dynamicOutlet.component.ts';

import { EditVariationFormComponent } from './../editVariationForm/editVariationForm.component.ts';

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
        <cb-edit-button [size]="24" (click)="toggleModal()"></cb-edit-button>
        <cb-delete-button [size]="24" (click)="deleteVariation()"></cb-delete-button>
        <cb-card>
            <cb-dynamic-outlet [componentPath]="componentPath" [component]="component" [variationData]="variationData"></cb-dynamic-outlet>
        </cb-card>
        <cb-modal [visible]="showModal" (onClose)="toggleModal()">
            <cb-edit-variation-form (onChanged)="persistVariation($event);"  [component]="component" [variationData]="variationData" [inputsCustomMeta]="inputsCustomMeta"></cb-edit-variation-form>
        </cb-modal>
    </div>
    </div>`,
})
export class Playlist {
    @Input() component: any;
    @Input() componentPath: string;
    @Input() variationData: any;
    @Input() inputsCustomMeta: any;
    @Output() onChanged = new EventEmitter();
    @Output() onDeleted = new EventEmitter();

    showModal: boolean = false;

    constructor() { }

    toggleModal() {
        this.showModal = !this.showModal;
    }

    persistVariation(variationData) {
        this.onChanged.emit({
            name: this.variationData.name,
            data: variationData
        });
    }

    deleteVariation() {
        this.onDeleted.emit(this.variationData);
    }
}
