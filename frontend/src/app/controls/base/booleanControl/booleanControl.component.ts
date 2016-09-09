/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-boolean-control',
    styles: [``],
    template: `
    <div [formGroup]="inputGroup">
    <label>{{label}}</label>
       <select formControlName="item" [(ngModel)]="value">
            <option [ngValue]="true">True</option>
            <option [ngValue]="false">False</option>
        </select>
    </div>
    `,
})
export class BooleanControlComponent {
    @Input() label: string;
    @Input() value: boolean;
    @Input() inputGroup: FormGroup;

    constructor() { }

    ngOnInit() {

    }
}
