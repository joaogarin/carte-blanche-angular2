
import * as React from 'react';
import { main } from './src/main';

let bootstrapedComponentName: string;

export default function playground(
    frontendData,
    pluginData,
    Component,
    componentPath,
    navigationStore,
) {

    // Parse the angular source from typedoc
    let AngularSource = JSON.stringify(pluginData.AngularSourceParsed);
    // Get Info from the component
    let componentName = pluginData.AngularSourceParsed.elements[0].componentInfo.name;
    let componentSource = pluginData.source;
    let options = JSON.stringify(frontendData.options);
    let basePath = pluginData.basePath;
    let bundle = pluginData.bundle;

    // Bootstrap the angular app if we are in a different component
    if (bootstrapedComponentName != componentName) {
        main();
        bootstrapedComponentName = componentName;
    }
    /**
     * We need to pass in the component as an input to the angular app so it can 
     * render it using Dynamic component loader
     */
    return <div data-bundle={bundle} data-base-path={basePath} data-frontend-options={frontendData.options} data-component-source={AngularSource} data-component={componentName} data-component-path={componentPath} className="cb-angular"></div>;
}
