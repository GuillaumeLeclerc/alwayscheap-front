import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';


const reducers = require('./reducers.js');

const store = createStore(combineReducers(reducers), 
    compose( applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;
