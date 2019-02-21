// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Newpost from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Newpost,
  domElementGetter,
})

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

// the location where SPA mounts the application
function domElementGetter() {
  return document.getElementById("newpost")
}