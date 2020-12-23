import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, imageUrl, caption }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                 className="post__avatar"
                 src="../logo.png"
                 alt={username}
                />
                <h3>{ username }</h3>
            </div>

            {/* {header -> avatar + username} */}
            <img className="post__image" src={imageUrl}/>
            {/* {image} */}
            <h4 className="post__text"><strong>{ username }</strong> { caption }</h4>
            {/* {Username + Cpation} */}
        </div>
    )
}

export default Post
