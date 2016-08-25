/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { Playlist } from './../playlist/playlist.component.ts';
import { CreateVariationButtonComponent, ModalComponent, EditButtonComponent } from './../common/index.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist-list',
    directives: [Playlist, CreateVariationButtonComponent, ModalComponent, EditButtonComponent],
    styles: [`
    .wrapper {
        background-color: #f4f7f9;
        height: 100%;
        width: 100%;
        opacity: 1;
        transition: opacity 1200ms ease-in-out;
    }
    .title {
        text-align: center;
        margin-top: 1em;
    }
  `],
    template: `<div class="wrapper">
        <h2 class="title">
            {{componentName}} <cb-edit-button [size]="24" (click)="toggleModal()"></cb-edit-button>
        </h2>
        <cb-playlist [component]="component"></cb-playlist>
        <cb-modal [visible]="showModal" (onClose)="toggleModal()">Hello Modal</cb-modal>
    </div>`,
})
export class PlaylistList {
    @Input() componentObj: any;
    @Input() componentName: string;
    component: any;
    showModal: boolean = false;

    constructor() { }

    ngOnInit() {
        // Read the @component decorator from the original component, get only the first to pass it down
        this.component = this.componentObj.elements[0];
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }
}
