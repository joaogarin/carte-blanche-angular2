/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { VariationsResolverService } from './../../../services/index.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-string-control',
    styles: [``],
    template: `
    <div [formGroup]="group">
        <label>{{label}}</label>
        <input type="text" [value]="value" formControlName="item" />
    </div>
    `,
})
export class StringControlComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() group: FormGroup;

    constructor(private variationsResolver: VariationsResolverService) { }

    ngOnInit() {
        console.log(this.group);
    }

    update(event) {
        this.variationsResolver.updateVariationInput(this.label, event.target.value);
    }
}
