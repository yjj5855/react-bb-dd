import { Map, List } from 'immutable'

function app(state = Map({}), aciton) {

    switch (aciton.type){
        case 'DDCONFIG_SUCCESS':
            return state.set('ddConfig', aciton.ddConfig)
        case 'DDCONFIG_ERROR':
            return state.set('ddConfig', false)

        //axios中间件生成的type
        case 'LOAD':
            return state.set('isLoading', true)
        case 'LOAD_SUCCESS':
            return state.set('isLoading', false)
        case 'LOAD_FAIL':
            return state.set('isLoading', false)

        default:
            return state;
    }


}


export default app;