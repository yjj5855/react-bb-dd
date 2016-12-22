import React from 'react'
import Photo from './Photo'
import Comment from './Comment'

const Single = React.createClass({

    getPost(props){
        const postId = props.params.postId;

        const i = props.$$posts.findIndex((post)=> {
            return post.get('code') === postId
        })

        const $$post = props.$$posts.get(i)

        return {
            postId,
            i,
            $$post
        }
    },
    render(){
        const { $$post, i, postId } = this.getPost(this.props)

        const postComments = ( this.props.$$comments.get &&  this.props.$$comments.get(postId) ? this.props.$$comments.get(postId).toJS() :[])

        return (
           <div className="single-photo">
               <Photo i={i} $$post={$$post} {...this.props} />

               <Comment postId={postId} postComments={postComments} {...this.props} />
           </div>
        )
    }
});

export default Single;