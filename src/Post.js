import { Avatar } from '@material-ui/core';
import React from 'react'
import './Post.css';


function Post({username,caption,imageUrl}){
    return(
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar" 
                    src="/static/images/avatar/image1.jpg"
                    alt=""
                       />
             <h3>{username}</h3>
             </div>
             <img className="post__image" src={imageUrl}/>
          
           <h3 className="post__text"><strong>{username}:</strong>  {caption}</h3>

        </div>
    )
} 
export default Post