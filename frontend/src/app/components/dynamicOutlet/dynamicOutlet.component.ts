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
  <div class="button-wrapper"><cb-randomize-button (randomize)="randomize()">Randomize</cb-randomize-button></div>`,
})
export class DynamicOutlet implements OnInit {
  @Input() component: any;
  cmpRef: ComponentRef<any>;

  constructor(
    private resolver: ComponentResolver,
    private componentGenerator: ComponentGenerator,
    private metaDataResolver: ComponentMetadataResolver,
    private vcRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.renderComponent();
  }

  /**
   * Use the componentGenerator service to render 
   * the component Dynamically
   * 
   * Will also use the inputs gathered from typedoc and call the component metadata resolver to 
   * generate some sample data.
   */
  renderComponent() {
    let componentDecorator = eval("(" + this.component.componentDecorators[0].arguments.obj + ")");

    const metadata = new ComponentMetadata({
      selector: 'dynamic-outlet',
      styles: [componentDecorator.styles[0]],
      template: componentDecorator.template,
    });

    this.componentGenerator.createComponentFactory(this.resolver, metadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, -1, injector, []);

        this.component.inputs.forEach(input => {
          // This has to be dynamic for every input
          this.cmpRef.instance[input.name] = this.metaDataResolver.getMetadata(input.name);
        });
      });
  }

  /**
   * Change the input values by calling the component metadata resolver service
   */
  randomize() {
    // Render the component again
    this.component.inputs.forEach(input => {
      // This has to be dynamic for every input
      this.cmpRef.instance[input.name] = this.metaDataResolver.getMetadata(input.name);
      this.cmpRef.changeDetectorRef.detectChanges();
      //this.metaDataResolver.getFakerData(inputType);
    });
  }
}
