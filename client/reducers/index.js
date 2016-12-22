import { combineReducers } from 'redux-immutable'
// import { routerReducer} from 'react-router-redux'

import posts from './posts'
import comments from './comments'
import app from './app'
import route from './route'

const rootReducer = combineReducers({
    app,
    posts,
    comments,
    routing: route
});

export default rootReducer;