/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-number-control',
    styles: [``],
    template: `
    <div [formGroup]="inputGroup">
        <label for="numberElement">{{label}}</label>
        <input id="numberElement" type="number" [(ngModel)]="value" formControlName="item" required/>
    </div>
    `,
})
export class NumberControlComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() inputGroup: FormGroup;

    constructor() { }

    ngOnInit() {}
}
