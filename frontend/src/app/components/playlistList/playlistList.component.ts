/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { Playlist } from './../playlist/playlist.component.ts';
import { CreateVariationButtonComponent, ModalComponent, EditButtonComponent } from './../common/index.ts';
import { customMetadataFormComponent } from './../customMetadataForm/customMetadataForm.component.ts';
import { ComponentGenerator, ComponentMetadataResolver } from './../../services/index.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist-list',
    directives: [Playlist, CreateVariationButtonComponent, ModalComponent, EditButtonComponent, customMetadataFormComponent],
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
        <cb-playlist [componentPath]="componentPath" [component]="component" [inputsCustomMeta]="inputsCustomMeta"></cb-playlist>
        <cb-modal [visible]="showModal" (onClose)="toggleModal()">
            <cb-customm-metadata-form (changed)="componentPropsChange()" [componentPath]="componentPath" [component]="component"></cb-customm-metadata-form>
        </cb-modal>
    </div>`,
})
export class PlaylistList {
    @Input() componentObj: any;
    @Input() componentName: string;
    @Input() componentPath: string;

    component: any;
    inputsCustomMeta: Object = {};
    showModal: boolean = false;

    constructor(private metaDataResolver: ComponentMetadataResolver) { }

    ngOnInit() {
        // Read the @component decorator from the original component, get only the first to pass it down
        this.component = this.componentObj.elements[0];
        this.getMetadataInfo();
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }

    componentPropsChange() {
        this.showModal = false;
        this.getMetadataInfo();
    }

    /**
   * Get the component metadata info from the ComponentMetadataResolver service
   */
    getMetadataInfo() {
        this.metaDataResolver.getCustomMetadata('localhost', '7000', this.componentPath, (customMetadata) => {
            if (customMetadata) {
                this.inputsCustomMeta = customMetadata.metadata.props;
            }
        });
    }
}
