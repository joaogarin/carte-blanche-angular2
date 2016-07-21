
import * as React from 'react';
import {main} from './src/main.ts';

export default function playground(frontendData, pluginData, Component, componentPath) {

    console.log(pluginData);
    console.log(JSON.parse(pluginData.AngularSouce));
    console.log(Component);
    console.log(componentPath);

    // Parse the angular source from typedoc
    let AngularSource = JSON.parse(pluginData.AngularSouce);
    // Get Info from the component
    let componentName = AngularSource.children[0].children[0].name;
    let componentSource = pluginData.source;

    // Bootstrap the angular app
    main();

    /**
     * We need to pass in the component as an input to the angular app so it can 
     * render it using Dynamic component loader
     */
    return <div data-component-source={componentSource} data-component={componentName} data-component-path={componentPath} className="cb-angular"></div>;
}
