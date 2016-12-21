'use strict'
import Q from 'q'
import jsapi from './ddApiConfig'
import { logException } from './ravenConfig'

var getMethod = function(method, ns) {
    var arr = method.split('.');
    var namespace = ns || dd;
    for (var i = 0, k = arr.length; i < k; i++) {
        if (i === k - 1) {
            return namespace[arr[i]];
        }
        if (typeof namespace[arr[i]] == 'undefined') {
            namespace[arr[i]] = {};
        }
        namespace = namespace[arr[i]];
    }
};

function callJsApi(method, param = {}) {
    return Q.Promise((success, error)=> {

        if (!window.ability || window.ability < jsapi[method]) {
            logException(new Error('容器版本过低，不支持 ' + method), {
                method: method,
                param: param
            });
            return error({errCode: 404, msg: '容器版本过低，不支持' + method})
        }

        param.onSuccess = function (result) {
            process.env.NODE_ENV !== 'production' && console.log(method, '调用成功，success', result)
            success(result)
        };
        param.onFail = function (result) {
            process.env.NODE_ENV !== 'production' && console.log(method, '调用失败，fail', result)
            error(result)
            logException(new Error(method+ '调用失败，fail'), result);
        };
        getMethod(method)(param);
    })
}

export default callJsApi