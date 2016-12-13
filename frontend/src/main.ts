/*
 * Providers provided by Angular
 */
import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*
 * App Component
 * our top level component that holds all of our components
 */
import { AppComponent } from './app/app';

/**
 * import services
 */
import { ComponentGenerator, ComponentMetadataResolver, fakerDataGenerator } from './app/services/index';

/**
 * import components
 */
import { ButtonComponent, CardComponent, CreateVariationButtonComponent, createVariationFormComponent, EditButtonComponent, DeleteButtonComponent, ModalComponent } from './app/components/common/index.ts';
import { customMetadataFormComponent } from './app/components/customMetadataForm/customMetadataForm.component';
import { Playlist } from './app/components/playlist/playlist.component';
import { PlaylistList } from './app/components/playlistList/playlistList.component';
import { DynamicOutlet } from './app/components/dynamicOutlet/dynamicOutlet.component';
import { IframeComponent } from './app/components/iframe/iframe.component';
import { EditVariationFormComponent } from './app/components/editVariationForm/editVariationForm.component';

@NgModule({
  declarations: [AppComponent,
    ButtonComponent,
    CardComponent,
    CreateVariationButtonComponent,
    createVariationFormComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    ModalComponent,
    customMetadataFormComponent,
    Playlist,
    PlaylistList,
    DynamicOutlet,
    IframeComponent,
    EditVariationFormComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
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