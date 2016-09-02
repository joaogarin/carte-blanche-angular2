/*
 * Angular 2 decorators and services
 */
import { Component, Input, OnInit, ReflectiveInjector, ViewContainerRef, ViewChild, ComponentRef, OnChanges } from '@angular/core';

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
  template: `<div id="dynamic-cmp" class="dynamic-comp"></div>
  <div class="button-wrapper">
    <cb-randomize-button (randomize)="randomize()">Randomize</cb-randomize-button>
  </div>`,
})
export class DynamicOutlet implements OnInit, OnChanges {
  @Input() component: any;
  @Input() componentPath: string;
  @Input() inputsCustomMeta: Object;

  cmpRef: ComponentRef<any>;
  @ViewChild('dynamic-cmp', { read: ViewContainerRef }) dynamicCmp;

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
    this.componentGenerator.createComponentFactory(componentDecorator)
      .then(factory => {
        this.vcRef.clear();
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        this.cmpRef = this.vcRef.createComponent(factory, -1, injector, []);
        this.getMetadataInfo();
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
    if (Object.keys(this.inputsCustomMeta).length > 0) {
      Object.keys(this.inputsCustomMeta).forEach(key => {
        // This has to be dynamic for every input
        this.cmpRef.instance[key] = this.metaDataResolver.getMetadata(this.inputsCustomMeta[key]);
      });
    }
  }
}
