import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreator'
import Main from './Main'

function mapStateToProps(state) {
    return {
        app: state.app,
        posts: state.posts,
        comments: state.comments
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;