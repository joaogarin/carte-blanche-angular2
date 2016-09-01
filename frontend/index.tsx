
import * as React from 'react';
import {main} from './src/main.ts';

export default function playground(frontendData, pluginData, Component, componentPath) {

    // Parse the angular source from typedoc
    let AngularSource = JSON.stringify(pluginData.AngularSourceParsed);
    // Get Info from the component
    let componentName = pluginData.AngularSourceParsed.elements[0].componentInfo.name;
    let componentSource = pluginData.source;
    let options = JSON.stringify(frontendData.options);

    // Bootstrap the angular app
    main();

    /**
     * We need to pass in the component as an input to the angular app so it can 
     * render it using Dynamic component loader
     */
    return <div data-frontend-options={frontendData.options} data-component-source={AngularSource} data-component={componentName} data-component-path={componentPath} className="cb-angular"></div>;
}
