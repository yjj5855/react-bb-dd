'use strict'
import Q from 'q'
import Raven from 'raven-js'
import jsapi from './ddApiConfig'
import { sentry_url, logException } from './ravenConfig'

//错误收集
Raven.config(sentry_url, {
    environment: process.env.NODE_ENV || 'dev',
    release: '0.0.1',
}).install();

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

export function ddIsReady(params) {
    return Q.Promise((success, error)=>{
        let timeout = setTimeout(()=>{
            error({errCode:-1,msg:'dd.ready初始化超时'});
            logException(new Error('dd.ready初始化超时'), params)
        },5000)
        dd.ready(function(){
            console.log('初始化钉钉');
            clearTimeout(timeout)

            //获取容器信息
            dd.runtime.info({
                onSuccess: function(result) {
                    window.ability = parseInt(result.ability.replace(/\./g,''));
                    console.log('容器版本为'+window.ability)
                },
                onFail : function(err) {}
            })
            //设置返回按钮
            dd.biz.navigation.setLeft({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                showIcon: true,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
                text: '返回',//控制显示文本，空字符串表示显示默认文本
                onSuccess : function(result) {
                    //如果control为true，则onSuccess将在发生按钮点击事件被回调
                    console.log('点击了返回按钮');
                    window.history.back();
                },
                onFail : function(err) {}
            });
            dd.biz.navigation.setRight({
                show:false,
            })
            success(true)
        });
        dd.error(function(err){
            clearTimeout(timeout)
            error({errCode:-1,msg:'dd.error配置信息不对'})
            console.log(err)
            logException(new Error('dd.error配置信息不对'), err)
        });
    })
}

export default function callJsApi(method, param = {}) {
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