import callJsApi from './ddPlugin'


let sessionStorage = window.sessionStorage
sessionStorage.clear()
let historyCount = sessionStorage.getItem('count') * 1 || 0
sessionStorage.setItem('/', 0)

let to = '/'; //当前路径
let from = null;

export function onEnter(nextState, replaceState){
    to = nextState.location.pathname;

    const toIndex = sessionStorage.getItem(to)
    const fromIndex = sessionStorage.getItem(from)

    if (toIndex) {
        if (toIndex > fromIndex || !fromIndex) {
            window.direction = 'forward'
        } else {
            window.direction = 'reverse'
        }
    } else {
        ++historyCount
        sessionStorage.setItem('count', historyCount)
        to !== '/' && sessionStorage.setItem(to, historyCount)
        window.direction = 'forward'
    }
    callJsApi('biz.navigation.setRight',{ show: false})
}

export function onLeave(currentState, replaceState){
    from = currentState.location.pathname;
    callJsApi('biz.navigation.setRight',{ show: false})
}