
function app(state = [], aciton) {

    switch (aciton.type){
        case 'DDCONFIG_SUCCESS':
            return {
                ...state,
                ddConfig: aciton.ddConfig
            }
        case 'DDCONFIG_ERROR':
            return {
                ...state,
                ddConfig: false
            }
        default:
            return state;
    }


}


export default app;