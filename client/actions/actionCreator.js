export function increment(index) {
    return {
        type: 'INCREMENT_LIKES',
        index
    }
}

export function addComment(postId, author, comment) {
    return {
        type: 'ADD_COMMENT',
        postId,
        author,
        comment
    }
}

export function removeComment(postId, i) {
    return {
        type: 'REMOVE_COMMENT',
        i,
        postId
    }
}

export function ddConfigSuccess(ddConfig) {
    return{
        type: 'DDCONFIG_SUCCESS',
        ddConfig
    }
}

export function ddConfigError() {
    return{
        type: 'DDCONFIG_ERROR',
    }
}

export function updateCode(code) {
    return{
        type: 'DDCONFIG_ERROR',
        code
    }
}