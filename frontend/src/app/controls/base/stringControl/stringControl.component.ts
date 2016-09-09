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
    <label>{{variationEl.name}}</label>
        <input type="text" [value]="variationEl.props[Elkey]"/>
    </div>
    `,
})
export class StringControlComponent {
    @Input() variationEl: any;
    Elkey: string;

    constructor() { }

    ngOnInit() {
        this.Elkey = Object.keys(this.variationEl.props)[0];
    }
}
