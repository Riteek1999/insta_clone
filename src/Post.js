import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Post.css";
import firebase from 'firebase';

function Post({ username, user, postId, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event)=>{
    event.preventDefault();
     db.collection("posts").doc(postId).collection("comments").add({
      text:comment,
      username:user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
     setComment('');
 }
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" src="../logo.png" alt={username} />
        <h3>{username}</h3>
      </div>

      {/* {header -> avatar + username} */}
      <img className="post__image" src={imageUrl} />
      {/* {image} */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* {Username + Cpation} */}

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
          {user && (
            <form className="post_commentBox">
            <input
              className="post_input"
              placeholder="add a comment.."
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="post_button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
          )}

    </div>
  );
}

export default Post;
