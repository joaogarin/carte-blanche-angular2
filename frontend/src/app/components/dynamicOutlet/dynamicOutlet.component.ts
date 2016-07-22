/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ReflectiveInjector, ViewContainerRef, ComponentMetadata, ComponentResolver, ComponentRef} from '@angular/core';
import * as path from 'path';

import {ComponentGenerator} from './../../services/componentGenerator.service.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'dynamic-outlet',
    template: `<div></div>`,
})
export class DynamicOutlet implements OnInit {
    @Input() basePath: string;
    @Input() componentObj: any;

    cmpRef: ComponentRef<any>;

    constructor(
        private resolver: ComponentResolver,
        private componentGenerator: ComponentGenerator,
        private vcRef: ViewContainerRef) {

    }

    ngOnInit() {
        // Read the @component decorator from the original component
        let compObj = eval("(" + this.componentObj.children[0].children[0].decorators[0].arguments.obj + ")");

        const metadata = new ComponentMetadata({
            selector: 'dynamic-outlet',
            styles: [compObj.styles[0]],
            template: compObj.template,
        });
        this.componentGenerator.createComponentFactory(this.resolver, metadata)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);

                // This has to be dynamic for every input
                this.cmpRef.instance.name = "My name is...";
            });
    }
}
