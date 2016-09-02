/**
 * Import angular core dependencies
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators } from '@angular/forms';

import { ButtonComponent } from './../../common/index.ts';

@Component({
    selector: 'cb-create-variation-form',
    styles: [`
    form {
        padding: 3rem;
    }
input {
        font-size: 1rem;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  border-radius: 0;
  border-radius: 0.2em;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  background-color: white;
  border: 1px solid #ccc;
  /*border-top-color: #c2c2c2;*/
  /*border-bottom-color: #d6d6d6;*/
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  color: #555;
  line-height: 1.2;
  height: 2.4em;
  padding: 0 0.75em;
}

input:hover {
  border-color: #adadad;
  outline: 0;
}
input:focus {
  border-color: rgba(19, 133, 229, 0.5);
  outline: 0;
}
    `],
    directives: [REACTIVE_FORM_DIRECTIVES, ButtonComponent],
    template: `
    <div>
       <form [formGroup]="createVariationForm" (ngSubmit)="onSubmit()">
            <input size="35" type="text" formControlName="name" placeholder="Variation name" />
            <cb-button [buttonType]="buttonClass" type="submit" [disabled]="!createVariationForm.valid">Submit project</cb-button>
       </form>
    </div>
    `
})
export class createVariationFormComponent {
    buttonClass: string;
    @Output() onCreateVariation = new EventEmitter();
    @Output() onCancel = new EventEmitter();


    createVariationForm = new FormGroup({
        name: new FormControl('', Validators.required),
    });

    constructor() {
        this.buttonClass = 'primary';
    }

    onSubmit() {
        this.onCreateVariation.emit({
            name: this.createVariationForm.controls['name'].value
        });
    }
}