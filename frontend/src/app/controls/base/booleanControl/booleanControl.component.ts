/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-boolean-control',
    styles: [``],
    template: `
    <div>
    <label>{{label}}</label>
       <select [value]="value">
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
    </div>
    `,
})
export class BooleanControlComponent {
    @Input() label: string;
    @Input() value: boolean;

    constructor() { }

    ngOnInit() {

    }
}
