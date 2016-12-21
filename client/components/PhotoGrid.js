import React from 'react'
import Router, { Link }  from 'react-router'
import Photo from './Photo'


let PhotoGrid = React.createClass({

    render(){
        return (
            <div className="photo-grid">
                {this.props.posts.map((post, i)=>
                    <Photo {...this.props} i={i} key={i} post={post} />
                )}
            </div>
        )
    }
});

export default PhotoGrid;