/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-string-control',
    styles: [``],
    template: `
    <div>
    <label>{{label}}</label>
        <input type="text" [value]="value"/>
    </div>
    `,
})
export class StringControlComponent {
    @Input() label: string;
    @Input() value: string;

    constructor() { }

    ngOnInit() {
        
    }
}
