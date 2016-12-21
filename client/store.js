import { createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'

//import thi root reducer
import rootReducer from './reducers/index'

import app from './data/app'
import comments from './data/comments'
import posts from './data/posts'

//create an object on the default data
const defaultState = {
    app,
    posts,
    comments
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f=>f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(hashHistory, store);

if(module.hot){
    module.hot.accept('./reducers/', ()=>{
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}

export default store;