import React from 'react';
import { render } from 'react-dom';

// import css from './styles/style.styl';

import Single from './components/Single'

import App from './page/App'
import Home from './page/home/index'

import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

import Raven from 'raven-js'
import { sentry_url, logException } from './common/ravenConfig'

import {onEnter, onLeave} from './common/routeHook'

Raven.config(sentry_url, {
    environment: process.env.NODE_ENV || 'dev',
    release: '0.0.1',
}).install();


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