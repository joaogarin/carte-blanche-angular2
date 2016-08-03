/*
 * Angular 2 decorators and services
 */
import { Component, Input } from '@angular/core';

import { Playlist } from './../playlist/playlist.component.ts';

@Component({
    // The selector is what angular internally uses
    selector: 'cb-playlist-list',
    directives: [Playlist],
    styles: [`
    .wrapper {
      background-color: #f4f7f9;
      height: 100%;
      width: 100%;
      opacity: 1;
      transition: opacity 1200ms ease-in-out;
    }
  `],
    template: `<div class="wrapper">
        <cb-playlist [componentObj]="componentObj"></cb-playlist>
    </div>`,
})
export class PlaylistList {
    @Input() componentObj: any;
    constructor() {

    }
}
