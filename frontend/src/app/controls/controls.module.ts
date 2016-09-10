import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Import our controls
 */
import { StringControlComponent } from './base/stringControl/stringControl.component.ts';
import { BooleanControlComponent } from './base/booleanControl/booleanControl.component.ts';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [StringControlComponent, BooleanControlComponent]
})
export class ControlsModule { }