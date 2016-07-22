import {Injectable, Component, Input, ComponentResolver, ComponentMetadata, ComponentFactory} from '@angular/core';

@Injectable()
export class ComponentGenerator {
    getComponent(componentName: string, componentDecorator: string, componentClassObj: Object) {
        let objComp = eval("(" + componentDecorator + ")");
        @Component({
            selector: objComp.selector,
            styles: [objComp.styles[0]],
            template: objComp.template
        })
        class NameComponent {
            @Input() name: string;
        }

        return NameComponent;
    }

    createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
        const cmpClass = class DynamicComponent { };
        const decoratedCmp = Component(metadata)(cmpClass);
        return resolver.resolveComponent(decoratedCmp);
    }
}