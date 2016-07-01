/**
 * Import Angular dependencies
 */
//import * as core from '@angular/core';
//import * as common from '@angular/common';

/**
 * Build the angular playground list with the component that gets sent in
 * 
 * Should this bootstrap a full angular app? What do we get here..?
 */
/**
 * Polyfills
 */
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

declare var module: any;
(module).exports = function playgroundAngular(frontendData, pluginData, Component, componentPath) {
    console.log(frontendData);
}
