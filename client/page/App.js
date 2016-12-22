import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreator'
import Main from './Main'

function mapStateToProps(state) {
    return {
        $$app: state.get('app'),
        $$posts: state.get('posts'),
        $$comments: state.get('comments')
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;