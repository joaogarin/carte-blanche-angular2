/*
 * Providers provided by Angular
 */
import { enableProdMode } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgClass } from '@angular/common';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.ts';

import { ComponentGenerator, ComponentMetadataResolver, fakerDataGenerator } from './app/services/index.ts';

@NgModule({
  declarations: [AppComponent, NgClass], // directives, components, and pipes owned by this NgModule
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [
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