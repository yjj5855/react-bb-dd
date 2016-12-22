import { LOCATION_CHANGE } from 'react-router-redux'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});

export default (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', action.payload);
    }

    return state;
};