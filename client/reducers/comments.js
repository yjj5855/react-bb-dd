function postComments(state = [], action) {

    switch (action.type){
        case 'ADD_COMMENT':
            return [
                ...state,
                {
                    user: action.author,
                    text: action.comment
                }
            ]
        case 'REMOVE_COMMENT':
            return [
                ...state.slice(0, action.i),
                ...state.slice(action.i+1)
            ]
        default:
            return state;
    }

}


function comments(state = {}, aciton) {

    // console.log('comment',aciton)
    if(typeof aciton.postId !== 'undefined'){
        return {
            ...state,
            [aciton.postId]: postComments(state[aciton.postId],aciton)
        }
    }
    return state;

}

export default comments;