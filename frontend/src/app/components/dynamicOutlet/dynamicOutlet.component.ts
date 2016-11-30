/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit, ReflectiveInjector, ViewContainerRef, ViewChild, ComponentRef, OnChanges, ComponentFactoryResolver } from '@angular/core';

import { ComponentGenerator, ComponentMetadataResolver } from './../../services/index';
import { VariationData } from './../../utils/index';

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
  template: `<div id="dynamic-cmp" class="dynamic-comp"></div>`,
})
export class DynamicOutlet implements OnInit, OnChanges {
  @Input() component: any;
  @Input() componentPath: string;
  @Input() variationData: VariationData;

  cmpRef: ComponentRef<any>;
  @ViewChild('placeholder', { read: ViewContainerRef }) viewContainerRef;

  constructor(
    private componentGenerator: ComponentGenerator,
    private metaDataResolver: ComponentMetadataResolver,
    private vcRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.getInfoAndRender();
  }

  ngOnChanges() {
    this.getInfoAndRender();
  }

  getInfoAndRender() {
    //this.getMetadataInfo();
    this.renderComponent();
  }

  /**
   * Use the componentGenerator service to render the component Dynamically
   * 
   * Will also use the inputs gathered from typedoc and call the component metadata resolver to 
   * generate some sample data.
   * 
   */
  renderComponent() {
    // Parse the decorator info
    let componentDecorator = this.getDecoratorObject(this.component.componentDecorators[0].arguments.obj);
    // get the ComponentFactory from our service so we can inject it into the view
    this.componentGenerator.createComponentFactory(componentDecorator, (factory) => {
      if (factory) {
        this.vcRef.clear();
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, -1, injector, []);
        this.getMetadataInfo();
      }
    });
  }

  /**
   * Parse the decorator we get from typedoc and return the object associated with it. The decorator comes 
   * as a string and can contain comments that is why we use eval() and not JSON.parse().
   * 
   * @param {string} decoratorString
   * The string representation of the decorator
   * 
   * @TODO - Clean this up and try a better way of getting this info without using eval()
   * 
   */
  getDecoratorObject(decoratorString) {
    return eval("(" + decoratorString + ")");
  }

  /**
   * Change the input values by calling the component metadata resolver service
   */
  randomize() {
    // Render the component again  
  }

  /**
   * Get the component metadata info from the ComponentMetadataResolver service
   */
  getMetadataInfo() {
    if (Object.keys(this.variationData).length > 0) {
      Object.keys(this.variationData.props).forEach(key => {
        // This has to be dynamic for every input
        this.cmpRef.instance[key] = this.variationData.props[key];
      });
    }
  }
}
