/*
 * Angular 2 decorators and services
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
 * Dynamic outlet to generate components
 */
@Component({
    selector: 'cb-modal',
    styles: [`
    .modalBackground {
        width: 100%;
        width: 100vw;
        height: 100%;
        height: 100vh;
        position: absolute;
        position: fixed;
        top: 0; right: 0; left: 0; bottom: 0;
        z-index: 4;
        background: rgba(255, 255, 255, 0.8);
    }

    .modal {
        padding: 2rem;
        width: 90%;
        width: 90vw;
        height: 90%;
        height: 90vh;
        margin: 5%;
        margin: 5vh 5vw;
        z-index: 5;
        position: absolute;
        position: fixed;
        top: 0; right: 0; left: 0; bottom: 0;
        background-color: white;
        -webkit-box-shadow: 0px 0px 28px 9px rgba(0,0,0,0.33);
        -moz-box-shadow: 0px 0px 28px 9px rgba(0,0,0,0.33);
        box-shadow: 0px 0px 28px 9px rgba(0,0,0,0.33);
        overflow-y: scroll;
        display: none;
    }
    .modal.visible {
        display: block;
    }

    .closeBtn {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        z-index: 2;
        padding: 0.5rem;
        border: none;
        background-color: transparent;
    }

    .closeBtnSvg {
        stroke: black;
        stroke-width: 3px;
    }
    `],
    template: `<div class="modal" [ngClass]="{visible: visible}">
        <ng-content></ng-content>
        <button
            class="closeBtn"
            (click)="closeModal()"
          >
            <svg
              class="closeBtnSvg"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                fill="none"
              >
                <path d="M.5.5l23 23M23.5.5l-23 23" />
              </g>
            </svg>
        </button>
    </div>`,
})
export class ModalComponent {
    @Input() visible: boolean = false;
    @Output() onClose = new EventEmitter<boolean>();

    constructor() {
    }

    closeModal() {
        this.onClose.emit(true);
    }
}
