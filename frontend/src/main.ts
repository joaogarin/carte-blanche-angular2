/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.ts';

import {ComponentGenerator} from './app/services/componentGenerator.service.ts';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  return bootstrap(AppComponent, [
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ComponentGenerator
  ])
    .catch(err => console.error(err));
}