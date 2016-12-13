import { Component, OnInit } from '@angular/core';

// Styles
import { styleVars } from './../../../styles';

@Component({
    selector: 'cb-input',
    styles: [`
    input{
        border: 1px solid ${styleVars.grayLight};
        padding: 10px 5px;
        border-radius: 4px;
    }
    `],
    template: `<input><ng-content></ng-content></input>`,
})
export class InputComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}