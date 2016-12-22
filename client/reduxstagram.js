import React from 'react';
import { render } from 'react-dom';

// import css from './styles/style.styl';

import Single from './components/Single'

import App from './page/App'
import Home from './page/home/index'

import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

import callJsApi ,{ ddIsReady } from './common/ddPlugin'
import {onEnter, onLeave} from './common/routeHook'

import axios from 'axios'
import { getConfig } from './common/axiosConfig'

let ddConfig = null;
getConfig()
    .then((data)=>{
        ddConfig = data;
        dd.config(ddConfig);
        return ddConfig
    })
    .then(ddIsReady)
    // .then(initReact)
    .then(()=>{
        document.querySelector('#init-loading').remove();
        console.log('init react 完成')
        setTimeout(()=>{
            if(ddConfig != null){
                // commit('DDCONFIG_SUCCESS', ddConfig)
            }else{
                // commit('DDCONFIG_ERROR', false);
            }
        },300)
    })
    .catch((err)=>{

        //手动触发dispatch
        $r.store.dispatch({ type: 'DDCONFIG_ERROR'})
        console.error(err);
    })

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} onEnter={onEnter} onLeave={onLeave}></IndexRoute>


                <Route path="/view/:postId" component={Single} onEnter={onEnter} onLeave={onLeave}></Route>
            </Route>
        </Router>
    </Provider>
)

render(router, document.getElementById('root'));