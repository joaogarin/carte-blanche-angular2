/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { VariationsResolverService } from './../../../services/index.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-string-control',
    styles: [``],
    template: `
    <div>
    <label>{{label}}</label>
        <input [value]="value" (keypress)="update($event)" type="text"/>
    </div>
    `,
})
export class StringControlComponent {
    @Input() label: string;
    @Input() value: string;

    constructor(private variationsResolver: VariationsResolverService) { }

    ngOnInit() { }

    update(event) {
        this.variationsResolver.updateVariationInput(this.label, event.target.value);
    }
}
