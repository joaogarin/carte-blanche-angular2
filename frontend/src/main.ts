/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from '@angular/core';
import {NgModule} from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import {HTTP_PROVIDERS} from '@angular/http';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.ts';

import { ComponentGenerator, ComponentMetadataResolver, fakerDataGenerator } from './app/services/index.ts';

@NgModule({
  declarations: [AppComponent], // directives, components, and pipes owned by this NgModule
  imports: [BrowserModule],
  providers: [
    ...HTTP_PROVIDERS,
    ...COMPILER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ComponentGenerator,
    fakerDataGenerator,
    ComponentMetadataResolver,
  ], // additional providers
  bootstrap: [AppComponent],
})
export class MyAppModule { }

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  return platformBrowserDynamic().bootstrapModule(MyAppModule);
}