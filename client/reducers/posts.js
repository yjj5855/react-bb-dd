import { Map, List } from 'immutable'

function posts(state = List([]), aciton) {

    // console.log('post',aciton)
    switch (aciton.type){
        case 'INCREMENT_LIKES':
            let i = aciton.index;
            state = state.update(i, function ($$post) {
                return $$post.set('likes', $$post.get('likes') + 1)
            });
            return state
        default:
            return state;
    }
}

export default posts;