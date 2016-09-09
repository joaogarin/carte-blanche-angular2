/**
 * Import angular core dependencies
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RuntimeCompiler } from "@angular/compiler";

import { ButtonComponent } from './../common/index.ts';
import { ComponentMetadataResolver } from './../../services/index.ts';

// Get our control types
import { defaultControls, StringControlComponent, ControlsModule } from './../../controls/index.ts';

@Component({
    selector: 'cb-edit-variation-form',
    styles: [``],
    template: `
    <div>
       <h1 class="title">Edit variation properties</h1>
       <p class="text-light">Select for each variation type the values you want</p>
       <form [formGroup]="variationPropertiesForm" (ngSubmit)="onSubmit()">
            <div #placeholder></div>
            <cb-button [buttonType]="buttonClass" type="submit" [disabled]="!variationPropertiesForm.valid">Submit project</cb-button>
       </form>
    </div>
    `
})
export class EditVariationFormComponent implements OnInit {
    @Input() variationData: Object;
    @Input() inputsCustomMeta: any;
    @Output() onChanged = new EventEmitter();

    @ViewChild("placeholder", { read: ViewContainerRef }) placeholderRef: ViewContainerRef;

    inputsGroup = new FormGroup({});
    variationPropertiesForm = new FormGroup({
        inputs: this.inputsGroup,
    });

    constructor(private metaDataResolver: ComponentMetadataResolver, private compiler: RuntimeCompiler) { }

    ngOnInit() {
        console.log(this.variationData);
        console.log(this.inputsCustomMeta);
        this.getCompiledModule();
    }

    onSubmit() { }

    getCompiledModule() {

        this.compiler.compileModuleAndAllComponentsAsync(ControlsModule).then((moduleWithComponentFactory) => {
            const compFactory = moduleWithComponentFactory.componentFactories
                .find(x => x.componentType === StringControlComponent);
            const cmpRef = this.placeholderRef.createComponent(compFactory, 0);

            //Put in the necessary inputs (variation props)
            cmpRef.instance['variationEl'] = this.variationData;
        });
    }
}