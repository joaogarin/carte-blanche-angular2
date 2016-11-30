/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { Playlist } from './../playlist/playlist.component';
import { CreateVariationButtonComponent, ModalComponent, EditButtonComponent } from './../common/index';
import { customMetadataFormComponent } from './../customMetadataForm/customMetadataForm.component';
import { ComponentGenerator, ComponentMetadataResolver } from './../../services/index';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist-list',
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
        <cb-modal [visible]="showModal" (onClose)="toggleModal()">
            <cb-customm-metadata-form (changed)="componentPropsChange()" [componentPath]="componentPath" [component]="component" [inputsCustomMeta]="inputsCustomMeta"></cb-customm-metadata-form>
        </cb-modal>
        <div *ngFor="let variation of variations; let i = index">
            <cb-playlist *ngIf="loadedCustomData" (onDeleted)="deleteVariation($event);" (onChanged)="persistVariation($event);" [componentPath]="componentPath" [component]="component" [variationData]="variation" [inputsCustomMeta]="inputsCustomMeta"></cb-playlist>
        </div>
        <cb-create-variation-button (onCreateVariation)="submitVariation($event)"></cb-create-variation-button>
    </div>`,
})
export class PlaylistList {
    @Input() componentObj: any;
    @Input() componentName: string;
    @Input() componentPath: string;
    @Input() frontendOptions: any;

    component: any;
    inputsCustomMeta: Object = {};
    showModal: boolean = false;
    loadedCustomData: boolean = false;
    variations: Object[] = [];

    constructor(private metaDataResolver: ComponentMetadataResolver) { }

    ngOnInit() {
        // Read the @component decorator from the original component, get only the first to pass it down
        this.component = this.componentObj.elements[0];
        this.getMetadataInfo();
        this.getVariations();
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
            else {
                this.getDefaultMetaInfo();
            }
            this.loadedCustomData = true;
        });
    }

    /**
     * get the default component metadata from the inputs
     */
    getDefaultMetaInfo() {
        this.component.inputs.forEach(input => {
            // This has to be dynamic for every input
            this.inputsCustomMeta[input.name] = input.type.name;
        });
    }

    /**
     * Get all variations of the current component
     */
    getVariations() {
        this.metaDataResolver.getVariations('localhost', '7000', this.componentPath, (response) => {
            if (response) {
                Object.keys(response).forEach((index) => {
                    this.variations = [...this.variations, response[index]];
                });
            }
        });
    }

    cleanVariations() {
        this.variations = [];
    }

    /**
     * Event called by the creat variation component
     * 
     * @params {string} name
     * The name of the variation to be created
     */
    submitVariation(variation) {
        console.log('Submit variation for ', this.inputsCustomMeta);
        this.metaDataResolver.saveVariation('localhost', '7000', variation.name, variation.name, this.inputsCustomMeta, this.componentPath, (response) => {
            this.cleanVariations();
            this.getVariations();
        });
    }

    /**
     * Edit an existing variation
     */
    persistVariation(variation) {
        this.metaDataResolver.persistVariation('localhost', '7000', variation.name, variation.name, variation.data, this.componentPath, (response) => {
            this.cleanVariations();
            this.getVariations();
        });
    }

    deleteVariation(variation) {
        console.log('Delete variation ', variation.name);
        this.metaDataResolver.deleteVariation('localhost', '7000', variation.name, variation.name, this.componentPath, (response) => {
            if (response) {
                this.cleanVariations();
                this.getVariations();
            }
        });
    }
}
