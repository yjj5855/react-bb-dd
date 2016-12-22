import React from 'react'
import Photo from './Photo'
import Comment from './Comment'

const Single = React.createClass({
    render(){
        const postId = this.props.params.postId;

        const i = this.props.$$posts.findIndex((post)=> {
            return post.get('code') === postId
        })

        const post = this.props.$$posts.get(i)

        const postComments = ( this.props.$$comments.get &&  this.props.$$comments.get(postId) ? this.props.$$comments.get(postId).toJS() :[])

        return (
           <div className="single-photo">
               <Photo i={i} $$post={post} {...this.props} />

               <Comment postId={postId} postComments={postComments} {...this.props} />
           </div>
        )
    }
});

export default Single;