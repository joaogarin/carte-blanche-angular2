/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ElementRef,ViewChild, ReflectiveInjector, ViewContainerRef, DynamicComponentLoader, ComponentMetadata, ComponentResolver, ComponentRef, Injector} from '@angular/core';
import * as path from 'path';

import {ComponentGenerator} from './../../services/componentGenerator.service.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'cb-iframe', // <app></app>
    // The template for our app
    template: `<div id="child"></div>
  `
})
export class IframeComponent implements OnInit {
    @Input() basePath: string;
    @Input() componentObj: any;
    userBundle: string;
    cmpRef: ComponentRef<any>;

    constructor(
        private _ref: ElementRef,
        private _injector: Injector,
        private resolver: ComponentResolver,
        private dcl: DynamicComponentLoader,
        private componentGenerator: ComponentGenerator,
        private vcRef: ViewContainerRef) {

    }

    ngOnInit() {

        let compObj = eval("(" + this.componentObj.children[0].children[0].decorators[0].arguments.obj + ")");

        const metadata = new ComponentMetadata({
            selector: 'dynamic-html',
            template: compObj.template,
        });
        this.componentGenerator.createComponentFactory(this.resolver, metadata)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
                this.cmpRef.instance.name = "My name is...";
            });

        /*console.log(this.componentObj);
        //this.componentSource.children[0].children[0].decorators[0].obj
        console.log(eval("(" + this.componentObj.children[0].children[0].decorators[0].arguments.obj + ")"));
        let Component = this.componentGenerator.getComponent('NameComponent', this.componentObj.children[0].children[0].decorators[0].arguments.obj, {});
        this.dcl.loadAsRoot(Component, '#child', this._injector).then(componentRef => {
            componentRef.instance.name = "data goes here";
        });*/
    }
}
