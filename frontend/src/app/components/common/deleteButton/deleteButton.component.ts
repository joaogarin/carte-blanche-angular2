/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { ButtonComponent } from './../index.ts';
/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-delete-button',
    styles: [`
    .svg path,
    .svg circle {
    stroke: #999;
    transition: stroke 150ms;
    }

    .svg:hover path,
    .svg:hover circle {
    stroke: #333;
    }
    `],
    template: `
    <cb-button>
    <svg
      class="svg"
      [attr.height]="size"
      [attr.width]="size"
      version="1.1"
      viewBox="0 0 24 24"
      x="0px"
      y="0px"
      xmlSpace="preserve"
    >
      <g id="Outline_Icons_1_">
        <g id="Outline_Icons">
          <g>
            <circle cx="12" cy="12" fill="none" r="11.5" strokeLinecap="round" />
            <path d="M12,4.333&#xA;&#x9;&#x9;&#x9;&#x9;c-4.234,0-7.667,3.433-7.667,7.667c0,1.598,0.489,3.08,1.326,4.308L16.309,5.659C15.08,4.823,13.598,4.333,12,4.333z" fill="none" />
            <path d="M7.691,18.341&#xA;&#x9;&#x9;&#x9;&#x9;c1.229,0.836,2.711,1.326,4.309,1.326c4.233,0,7.667-3.432,7.667-7.667c0-1.597-0.49-3.08-1.326-4.309L7.691,18.341z" fill="none" />
          </g>
        </g>
        <g id="New_icons_1_" />
      </g>
    </svg>
  </cb-button>
    `,
})
export class DeleteButtonComponent {
    @Input() size: number;

    constructor() {
    }
}
