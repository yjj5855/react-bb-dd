import { combineReducers } from 'redux'
import { routerReducer} from 'react-router-redux'

import posts from './posts'
import comments from './comments'
import app from './app'

const rootReducer = combineReducers({
    app,
    posts,
    comments,
    routing: routerReducer
});

export default rootReducer;