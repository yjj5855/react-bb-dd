import { Map, List } from 'immutable'

function postComments(state = List([]), action) {

    switch (action.type){
        case 'ADD_COMMENT':
            state = state.push(Map({
                user: action.author,
                text: action.comment
            }))
            return state;
        case 'REMOVE_COMMENT':
            return state.delete(action.i,1)
        default:
            return state;
    }

}


function comments(state = Map({}), aciton) {

    if(typeof aciton.postId !== 'undefined'){
        return state.set(aciton.postId, postComments(state.get(aciton.postId),aciton))
    }
    return state;

}

export default comments;