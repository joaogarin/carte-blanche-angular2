
import * as React from 'react';
import {main} from './src/main.ts';

export default function playground(frontendData, pluginData, Component, componentPath) {
  console.log(pluginData);
  // Bootstrap the angular app
  main();
  return <div className="cbapp">{componentPath}</div>;
}
