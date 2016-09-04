/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { ButtonComponent } from './../index.ts';
/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-edit-button',
    styles: [`
    .svg polygon,
    .svg line,
    .svg circle {
        stroke: #999;
        transition: stroke 150ms;
    }

    .svg:hover polygon,
    .svg:hover line,
    .svg:hover circle {
        stroke: #333;
    }
    `],
    template: `
    <cb-button>
    <svg
      [attr.height]="size"
      [attr.width]="size"
      version="1.1"
      viewBox="0 0 24 24"
      x="0px"
      y="0px"
      xmlSpace="preserve"
      class="svg"
    >
      <g id="Outline_Icons">
        <g>
          <polygon
            fill="none"
            points="&#xA;&#x9;&#x9;&#x9;&#x9;10.661,16.168 5.711,18.29 7.833,13.339 16.672,4.5 19.5,7.329 &#x9;&#x9;&#x9;"
            strokeLinecap="round"
          />
          <line fill="none" stroke="#000000" strokeLinecap="round" x1="17.664" x2="14.836" y1="9.165" y2="6.336" />
          <line fill="none" stroke="#000000" strokeLinecap="round" x1="10.661" x2="7.833" y1="16.168" y2="13.339" />
          <circle cx="12" cy="12" fill="none" r="11.5" stroke="#000000" strokeLinecap="round" />
        </g>
      </g>
      <g id="Frames-24px">
        <rect height="24" width="24" fill="none" />
      </g>
    </svg>
  </cb-button>
    `,
})
export class EditButtonComponent {
    @Input() size: number;

    constructor() {
    }
}
