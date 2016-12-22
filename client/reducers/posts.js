import { Map, List } from 'immutable'

function posts(state = List([]), aciton) {

    // console.log('post',aciton)
    switch (aciton.type){
        case 'INCREMENT_LIKES':
            let i = aciton.index;
            return state.update(i, function ($$post) {
                return $$post.set('likes', $$post.get('likes') + 1)
            });
        default:
            return state;
    }
}

export default posts;