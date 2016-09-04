import { Injectable, Component, Input, ComponentMetadata, ComponentFactory } from '@angular/core';
import { RuntimeCompiler } from "@angular/compiler";
import { MyAppModule } from './../../../main.ts';

@Injectable()
export class ComponentGenerator {

    constructor(private compiler: RuntimeCompiler) { }

    /**
     * Create the metadata for the component to be used to generate the component Factory
     * 
     * @param {Object} componentDecorator
     * The component decorator data we got from analyzing the component with typedoc. We will use this data to populate
     * parts of the Component metadata like selector, styles and template
     * 
     * @returns {ComponentMetadata} metadata
     * This component's metadata
     * 
     */
    createMetadata(componentDecorator): ComponentMetadata {
        return new ComponentMetadata({
            selector: 'dynamic-outlet',
            styles: [componentDecorator.styles[0]],
            template: componentDecorator.template,
        });
    }

    /**
     * Use the runtime compiler to create this Component Factory dynamically
     * 
     * This will create a dynamica component representation by calling  compiler.compileComponentAsync and passing in a NgModule
     * that we created when bootstraping our app
     * 
     * @param {Object} decoratorData
     * The medatata for this component we got from typedoc
     * 
     * @returns {Promise<ComponentFactory<any>>} 
     * Returns a promisse with the component factory created
     * 
     * With this Component Factory we can then inject it in the View by using ViewContainerRef and Injector
     * See @dynamicOutlot.component.ts
     */
    createComponentFactory(decoratorData: Object): Promise<ComponentFactory<any>> {

        // first get our metadata
        let metadata = this.createMetadata(decoratorData);

        const cmpClass = class DynamicComponent { };
        const decoratedCmp = Component(metadata)(cmpClass);

        return this.compiler.compileComponentAsync(decoratedCmp, MyAppModule);
    }
}