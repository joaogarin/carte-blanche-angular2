/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from '@angular/core';
import {NgModule} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.ts';

import {ComponentGenerator, ComponentMetadataResolver} from './app/services/index.ts';

@NgModule({
  declarations: [AppComponent], // directives, components, and pipes owned by this NgModule
  imports: [BrowserModule],
  providers: [
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ComponentGenerator,
    ComponentMetadataResolver,
  ], // additional providers
  bootstrap: [AppComponent],
})
class MyAppModule { }

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  return platformBrowserDynamic().bootstrapModule(MyAppModule);
}