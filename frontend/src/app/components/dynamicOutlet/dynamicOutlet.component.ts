/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ReflectiveInjector, ViewContainerRef, ComponentMetadata, ComponentResolver, ComponentRef} from '@angular/core';
import * as path from 'path';

import {ComponentGenerator} from './../../services/componentGenerator.service.ts';

/*
 * Dynamic outlet to generate components
 */
@Component({
  selector: 'cb-dynamic-outlet',
  template: `<div></div>`,
})
export class DynamicOutlet implements OnInit {
  @Input() componentObj: any;

  cmpRef: ComponentRef<any>;

  constructor(
    private resolver: ComponentResolver,
    private componentGenerator: ComponentGenerator,
    private vcRef: ViewContainerRef) {

  }

  ngOnInit() {
    // Read the @component decorator from the original component

    let components = this.componentObj.elements;
    console.log(this.componentObj);

    components.forEach(element => {

      let componentDecorator = eval("(" + element.componentDecorators[0].arguments.obj + ")");

      const metadata = new ComponentMetadata({
        selector: 'dynamic-outlet',
        styles: [componentDecorator.styles[0]],
        template: componentDecorator.template,
      });

      this.componentGenerator.createComponentFactory(this.resolver, metadata)
        .then(factory => {
          const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
          this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);

          element.inputs.forEach(input => {
            // This has to be dynamic for every input
            if (input.name == 'description') {
              this.cmpRef.instance[input.name] = 'Hot reloading makes for a great Developer Experience, but we can do even better.';
            }
            if (input.name == 'name') {
              this.cmpRef.instance[input.name] = 'Carte blanche angular';
            }
            if (input.name == 'image') {
              this.cmpRef.instance[input.name] = 'https://hd.unsplash.com/photo-1468245856972-a0333f3f8293';
            }
          });
        });
    });
  }
}
