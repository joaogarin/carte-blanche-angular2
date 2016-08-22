/*
 * Angular 2 decorators and services
 */
import {Component, Input, OnInit, ReflectiveInjector, ViewContainerRef, ComponentMetadata, ComponentResolver, ComponentRef} from '@angular/core';
import * as path from 'path';

import { ComponentGenerator, ComponentMetadataResolver } from './../../services/index.ts';
import { RandomizeButtonComponent } from './../common/index.ts';
/*
 * Dynamic outlet to generate components
 */
@Component({
  selector: 'cb-dynamic-outlet',
  styles: [`
  .button-wrapper {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  `],
  directives: [RandomizeButtonComponent],
  template: `<div class="dynamic-comp"></div>
  <div class="button-wrapper"><cb-randomize-button (click)="randomize()">Randomize</cb-randomize-button></div>`,
})
export class DynamicOutlet implements OnInit {
  @Input() componentObj: any;
  cmpRef: ComponentRef<any>;

  components: Array<any>;

  constructor(
    private resolver: ComponentResolver,
    private componentGenerator: ComponentGenerator,
    private metaDataResolver: ComponentMetadataResolver,
    private vcRef: ViewContainerRef) {
  }

  ngOnInit() {
    // Read the @component decorator from the original component
    this.components = this.componentObj.elements;
    this.renderComponent();
  }

  renderComponent() {
    this.components.forEach(element => {

      let componentDecorator = eval("(" + element.componentDecorators[0].arguments.obj + ")");

      const metadata = new ComponentMetadata({
        selector: 'dynamic-outlet',
        styles: [componentDecorator.styles[0]],
        template: componentDecorator.template,
      });

      this.componentGenerator.createComponentFactory(this.resolver, metadata)
        .then(factory => {
          const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
          this.cmpRef = this.vcRef.createComponent(factory, -1, injector, []);

          element.inputs.forEach(input => {
            // This has to be dynamic for every input
            this.cmpRef.instance[input.name] = this.metaDataResolver.getMetadata(input.name);
          });
        });
    });
  }

  randomize() {
    // Render the component again
    this.components.forEach(element => {
      element.inputs.forEach(input => {
        // This has to be dynamic for every input
        this.cmpRef.instance[input.name] = this.metaDataResolver.getMetadata(input.name);
      });
    });
  }
}
