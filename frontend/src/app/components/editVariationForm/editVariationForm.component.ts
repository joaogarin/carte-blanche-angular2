/**
 * Import angular core dependencies
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, QueryList, ViewContainerRef, ViewChildren, Compiler } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ButtonComponent } from './../common/index';
import { ComponentMetadataResolver } from './../../services/index';
import { Subscription } from 'rxjs/Subscription';

// Get our control types
import { defaultControls, ControlsModule } from './../../controls/index';

@Component({
    selector: 'cb-edit-variation-form',
    styles: [``],
    template: `
    <div>
       <h1 class="title">Edit variation properties</h1>
       <p class="text-light">Select for each variation type the values you want</p>
       <form [formGroup]="variationPropertiesForm" (ngSubmit)="onSubmit()">
            <div *ngFor="let input of inputs; let i = index" formGroupName="inputs">
                <div [id]="input.name" #text></div>
            </div>
            <cb-button (click)="persistVariation()" [buttonType]="buttonClass" type="submit" [disabled]="!variationPropertiesForm.valid">Submit project</cb-button>
       </form>
    </div>
    `
})
export class EditVariationFormComponent implements OnInit {
    @Input() component: any;
    @Input() variationData: Object;
    @Input() inputsCustomMeta: any;
    @Output() onChanged = new EventEmitter();

    @ViewChildren('text', { read: ViewContainerRef }) children: QueryList<ViewContainerRef>;

    variationDataCopy: any;
    inputs: Object[] = [];

    inputsGroup = new FormGroup({});
    variationPropertiesForm = new FormGroup({
        inputs: this.inputsGroup,
    });

    constructor(private metaDataResolver: ComponentMetadataResolver, private compiler: Compiler) { }

    ngOnInit() {
        // Save a copy so we dont manipulate the input when binding to the form
        this.variationDataCopy = Object.assign({}, this.variationData);

        // Generate the controls for each input
        this.generateInputTypeControls();
        this.getCompiledModule();
    }

    onSubmit() { }

    /**
     * Find the right control type by compiling the Controls Module and filtering 
     * for the correct control type
     */
    getCompiledModule() {
        this.component.inputs.forEach(input => {
            this.compiler.compileModuleAndAllComponentsAsync(ControlsModule).then((moduleWithComponentFactory) => {
                const compFactory = moduleWithComponentFactory.componentFactories
                    .find(x => x.componentType === this.getControlType(input.type.name));
                compFactory ? this.generateInputFormControl(compFactory, input) : '';
            });
        });
    }

    /**
     * Find the correct control type based on the input type
     * 
     * @params {string} inputType
     * The type of the input
     * 
     * @return {ComponentFactory<any>.componentType: Type<any>} Type
     * The component type to render
     */
    getControlType(inputType) {
        return defaultControls[inputType].control;
    }

    /**
     * Generate the right control component for this particular input
     * 
     * @params {ComponentFactory<any>} compFactory
     * The component factory object that we get from the module corresponding 
     * to the right control type
     * 
     * @params {Object} input
     * The input that this control will refer to
     */
    generateInputFormControl(compFactory, input) {
        let childContainer: ViewContainerRef;
        if (childContainer = this.getChildContainer(input)) {
            //console.log(namedChild);
            const cmpRef = childContainer.createComponent(compFactory, 0);
            //Put in the necessary inputs (variation props)
            cmpRef.instance['label'] = input.name;
            cmpRef.instance['value'] = this.variationData['props'][input.name];
            cmpRef.instance['inputGroup'] = this.inputsGroup.controls[input.name];
        }
    }

    /**
     * Get the right container element from the View using ViewChildren
     * 
     * @params {Object} input
     * The input that this control will refer to
     * 
     * @return {ViewContainerRef}
     * The ViewContainerRef element to create component using ViewContainerRef.createComponent()
     */
    getChildContainer(input): ViewContainerRef {
        return this.children.filter((child: ViewContainerRef) => {
            let element: HTMLElement = child.element.nativeElement;
            return element.id == input.name;
        })[0];
    }

    /**
     * Generate a selector for the appropriate control for each input type. start by
     * reading the input type (string, number, float etc) and from there generate the 
     * types of controls  that can apply like phone number, avatar etc.
     * 
     */
    generateInputTypeControls() {
        this.component.inputs.forEach(input => {
            this.inputsGroup.addControl(input.name, new FormGroup({
                item: new FormControl(this.variationDataCopy[input.name])
            }));
            this.inputs = [...this.inputs, input];
        });
    }

    /**
     * Submit the form
     */
    persistVariation() {
        let variationInputsObject = {};
        this.component.inputs.forEach(input => {
            variationInputsObject[input.name] = this.inputsGroup.controls[input.name]['controls']['item'].value;
        });
        console.log(variationInputsObject);
        this.onChanged.emit(variationInputsObject);
    }
}