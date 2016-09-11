/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-string-control',
    styles: [``],
    template: `
    <div [formGroup]="inputGroup">
        <label>{{label}}</label>
        <input type="text" [(ngModel)]="value" formControlName="item" />
    </div>
    `,
})
export class StringControlComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() inputGroup: FormGroup;

    constructor() { }

    ngOnInit() {}
}
