import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link } from 'react-router-dom';
import { editPost } from '../fetch';
import { ThumbUpAltOutlined, ThumbUpAlt } from '@material-ui/icons'
import './styles/Post.css'
import { Redirect } from 'react-router-dom';
import { likepost } from '../actions'
import useTimeDifference from '../hooks/useTimeDifference';
import useUrl from '../hooks/useProfileUrl';

function Post(props) {
  const timeDifference = useTimeDifference();
  const url = useUrl();

  const [toRedirect, setRedirect] = useState(false);
  const [likeCount, setLikeCount] = useState(props.postDetails.number_of_likes);
  const [isLiked, setLiked] = useState(props.postDetails.isLiked);
  const id = useSelector(store => store.userDetails.id);
  const dispatch = useDispatch()

  function handleLike() {
    if (id) {
      editPost(id, props.postDetails.id, 'like', null, data => {
        data.status === 200 ? (function() {
          dispatch(likepost(props.postDetails.id, data.newLikeCount, data.liked));
          setLikeCount(data.newLikeCount);
          setLiked(!isLiked);
        })() : console.error('some error');
      })
    } else setRedirect(true)
  }


  if (!toRedirect) {
    return (
      <div className="post" initial = {{opacity: 0}} animate = {{opacity: 1}}>
        <div className="post__header">
          <div className="posterImage" style = {{backgroundImage: `url(${url(props.postDetails.posterPicture)})`}}>
          <img 
            src={url(props.postDetails.posterPicture)}
            alt="" className='img-responsive img-fluid img-rounded'
          />
          </div>
          <div className="poster__details">
            <Link to = {`/view/user-profile/${props.postDetails.posterId}`}>{props.postDetails.poster}</Link>
            <small>{timeDifference(props.postDetails.dateCreated)}</small>
          </div>
        </div>
        <hr />
        <p className = 'postContent'>{props.postDetails.content}</p>
        <div className="postImage">
          {props.postDetails.image ? <img src={`${url(props.postDetails.image)}`} alt="" className='img-responsive img-fluid' /> : ""}
          <div className={`likeButtons ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
            <p className='like'>{isLiked ? <ThumbUpAlt className = 'liked'/> : <ThumbUpAltOutlined/>}{likeCount}</p>
          </div>
        </div>
      </div>
    )
  } else {
    return <Redirect to='/login' />
  }
}
export default Post;