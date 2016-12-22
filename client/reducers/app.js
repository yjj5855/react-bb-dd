
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

        //axios中间件生成的type
        case 'LOAD':
            return {
                ...state,
                isLoading : true,
            }
        case 'LOAD_SUCCESS':
            return {
                ...state,
                isLoading : false,
            }
        case 'LOAD_FAIL':
            return {
                ...state,
                isLoading : false,
            }
        default:
            return state;
    }


}


export default app;