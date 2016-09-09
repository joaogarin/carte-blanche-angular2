import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Import our controls
 */
import { StringControlComponent } from './base/stringControl/stringControl.component.ts';

@NgModule({
    imports: [BrowserModule],
    declarations: [StringControlComponent]
})
export class ControlsModule { }