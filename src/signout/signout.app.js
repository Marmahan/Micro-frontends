// home.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Singout from './root.component.js';



const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Singout,
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

// Finally, we specify the location we want single-spa to mount our application
function domElementGetter() {
  return document.getElementById("signout")
}