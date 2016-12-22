import Q from 'q'
import axios from 'axios'
import { logException } from './ravenConfig'

const config = {

    // 请求方法同上
    method: 'get', // default
    // 基础url前缀
    baseURL: 'http://116.236.230.131:55002',


    // transformRequest: [function (data) {
    //     // 这里可以在发送请求之前对请求数据做处理
    //
    //     return data;
    // }],
    //
    // transformResponse: function (response) {
    //     // 这里提前处理返回的数据
    //     let res = null;
    //     try {
    //         res = JSON.parse(response)
    //     }catch (err){
    //         logException(new Error('接口返回不是一个对象'), err)
    //     }
    //
    //     console.log(res)
    //     if(typeof res == 'object'){
    //         res.code = parseInt(res.code);
    //         switch(res.code){
    //             case 200:
    //
    //                 break;
    //             default:
    //                 logException(new Error(res.status||res.code+' 错误'), res)
    //                 break;
    //         }
    //     }
    //     return res || null;
    // },

    // 请求头信息
    // headers: {'X-Requested-With': 'XMLHttpRequest'},

    //parameter参数
    // params: {
    //     ID: 12345
    // },

    //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
    data: {

    },

    //设置超时时间
    timeout: 5000,
    //返回数据类型
    // responseType: 'json', // default

}

//全局配置axios
for(let key in config){
    axios.defaults[key] = config[key];
}
//response过滤
axios.interceptors.response.use(function (response) {
    // 这里提前处理返回的数据
    if(typeof response == 'object'){
        if(response.status == 200){

            return response.data;

        }else{
            logException(new Error(response.status+' 错误'), response)
        }
    }else{
        logException(new Error('接口返回不是一个对象'), response)
    }
    return response;
}, function (error) {
    logException(new Error('接口请求失败'), error)
    return Q.Promise.reject(error);
});

export default config;


export function getParamByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function getConfig() {
    return Q.Promise((success, error)=>{
        axios.get('/auth/getConfig', {
            params: {
                corpid: getParamByName('corpid')||'ding1b56d2f4ba72e91635c2f4657eb6378f',
                appid: getParamByName('appid')||'2545',
                suitekey: getParamByName('suiteKey')||'suiteiyfdj0dfixywzqwg',
                paramUrl: document.URL
            },
            timeout: 2000,
        }).then(function (data) {

            if(data.code == 200){
                let res = data.result;
                let ddConfig = {
                    agentId: res.agentId, // 必填，微应用ID
                    corpId: res.corpId,//必填，企业ID
                    timeStamp: res.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名
                    type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                    jsApiList : [
                        'runtime.info',
                        'runtime.permission.requestAuthCode',
                        //反馈式操作临时授权码
                        'runtime.permission.requestOperateAuthCode',

                        'biz.alipay.pay',
                        'biz.contact.choose',
                        'biz.contact.complexChoose',
                        'biz.contact.complexPicker',
                        'biz.contact.createGroup',
                        'biz.customContact.choose',
                        'biz.customContact.multipleChoose',
                        'biz.ding.post',
                        'biz.map.locate',
                        'biz.map.view',
                        'biz.util.openLink',
                        'biz.util.open',
                        'biz.util.share',
                        'biz.util.ut',
                        'biz.util.uploadImage',
                        'biz.util.previewImage',
                        'biz.util.datepicker',
                        'biz.util.timepicker',
                        'biz.util.datetimepicker',
                        'biz.util.chosen',
                        'biz.util.encrypt',
                        'biz.util.decrypt',
                        'biz.chat.pickConversation',
                        'biz.telephone.call',
                        'biz.navigation.setLeft',
                        'biz.navigation.setTitle',
                        'biz.navigation.setIcon',
                        'biz.navigation.close',
                        'biz.navigation.setRight',
                        'biz.navigation.setMenu',
                        'biz.user.get',

                        'ui.progressBar.setColors',

                        'device.base.getInterface',
                        'device.connection.getNetworkType',
                        'device.launcher.checkInstalledApps',
                        'device.launcher.launchApp',
                        'device.notification.confirm',
                        'device.notification.alert',
                        'device.notification.prompt',
                        'device.notification.showPreloader',
                        'device.notification.hidePreloader',
                        'device.notification.toast',
                        'device.notification.actionSheet',
                        'device.notification.modal',
                        'device.geolocation.get',


                    ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                }
                success(ddConfig)
            }else{
                error({errCode:-2,msg:'接口请求失败'})
                logException(new Error('config接口请求失败'), this)
            }
        }).catch(function (err) {
            error({errCode:-2,msg:'接口请求失败'})
            logException(new Error('config接口请求失败'), err)
        });
    })
}

