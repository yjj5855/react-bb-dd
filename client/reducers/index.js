import { combineReducers } from 'redux-immutable'


import app from './app'
import route from './route'

const rootReducer = combineReducers({
    app,
    routing: route
});

export default rootReducer;