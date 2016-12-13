import { Injectable, Component, Input, ComponentFactory, ComponentFactoryResolver, NgModule, Compiler } from '@angular/core';
import { } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MyAppModule } from './../../../main';

@Injectable()
export class ComponentGenerator {

    constructor(private compiler: Compiler) { }

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
    createMetadata(componentDecorator): Component {
        return new Component({
            selector: 'cb-dynamic-outlet',
            styles: [componentDecorator.styles[0]],
            template: componentDecorator.template,
        });
    }

    /**
     * Use the runtime compiler to create this Component Factory dynamically as well as a dynamic module 
     * to wrapp it
     * 
     * This will create a dynamic module and a dynamic component by calling  compiler.compileModuleAndAllComponentsAsync and passing in a NgModule
     * that we create on the fly wrapping our newly created component
     * 
     * @param {Object} decoratorData
     * The medatata for this component we got from typedoc
     * 
     * @param {Function} cb
     * The callback to call when we create the component returning inside our component Factor
     * 
     * With this Component Factory we can then inject it in the View by using ViewContainerRef and Injector
     * See @dynamicOutlot.component.ts
     */
    createComponentFactory(decoratorData: Object, cb: Function) {

        // first get our metadata
        let metadata = this.createMetadata(decoratorData);
        let factory;

        const cmpClass = class DynamicComponent { };
        const decoratedCmp = Component(metadata)(cmpClass);

        @NgModule({
            imports: [BrowserModule],
            declarations: [decoratedCmp]
        })
        class DynamicModule { }

        this.compiler.compileModuleAndAllComponentsAsync(DynamicModule).then((moduleWithComponentFactory) => {
            const compFactory = moduleWithComponentFactory.componentFactories
                .find(x => x.componentType === decoratedCmp);
            cb(compFactory);
        });
    }
}