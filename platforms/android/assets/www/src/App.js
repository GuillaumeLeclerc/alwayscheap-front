import React, {Component} from 'react';
import ProductList from './containers/ProductList.js'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick'
import Menu from './containers/Menu.js'

import store from './store/index.js'
console.log('injected');
injectTapEventPlugin();
console.log('injected');

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

const addIconStyle = {
  fill: 'white',
}

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <Menu />
            <ProductList />
          </div>
         </Provider>
      );
    }
  }
