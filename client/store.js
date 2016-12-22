import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

//import thi root reducer
import rootReducer from './reducers/index'

import Immutable from 'immutable'
import app from './data/app'
import comments from './data/comments'
import posts from './data/posts'


//create an object on the default data
const defaultState = Immutable.fromJS({
    app,
    posts,
    comments,
});

const enhancers = compose(
    applyMiddleware(
        axiosMiddleware(axios), //axios 中间件
    ),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
);
const store = createStore(
    rootReducer,
    defaultState,
    enhancers
);

export const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    }
});

if(module.hot){
    module.hot.accept('./reducers/', ()=>{
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;