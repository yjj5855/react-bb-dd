// a reducer takes in two things

//1. the action
//2. copy of current state

function posts(state = [], aciton) {

    // console.log('post',aciton)
    switch (aciton.type){
        case 'INCREMENT_LIKES':
            let i = aciton.index;
            return [
                ...state.slice(0,i),
                {...state[i], likes: state[i].likes + 1},
                ...state.slice(i + 1)
            ]
        default:
            return state;
    }
}

export default posts;