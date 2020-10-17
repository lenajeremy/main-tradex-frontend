import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link } from 'react-router-dom';
import { editPost } from '../fetch';
import { ThumbUpAltOutlined } from '@material-ui/icons'
import './styles/Post.css'
import { Redirect } from 'react-router-dom';
import { likepost } from '../actions'


function getTimeDifference(initial) {
  let difference = Math.round(Date.now() / 1000 - initial)
  const returnDiffText = difference => {
    if (difference >= 29030400) {
      return `about ${Math.round(difference / 29030400)} year${Math.round(difference / 29030400) === 1 ? '' : 's'} ago`;
    } else if (difference >= 2419200) {
      return `about ${Math.round(difference / 2419200)} month${Math.round(difference / 2419200) === 1 ? '' : 's'} ago`;
    } else if (difference >= 604800) {
      return `about ${Math.round(difference / 604800)} week${Math.round(difference / 604800) === 1 ? '' : 's'} ago`;
    } else if (difference >= 86400) {
      return `about ${Math.round(difference / 86400)} day${Math.round(difference / 86400) === 1 ? '' : 's'} ago`;
    } else if (difference >= 3600) {
      return `about ${Math.round(difference / 3600)} hour${Math.round(difference / 3600) === 1 ? '' : 's'} ago`;
    } else if (difference >= 60) {
      return `about ${Math.round(difference / 60)} minute${Math.round(difference / 60) === 1 ? '' : 's'} ago`;
    }
    return 'a few seconds ago';
  }
  return returnDiffText(difference)
}


function Post(props) {

  const [toRedirect, setRedirect] = useState(false);
  const [likeCount, setLikeCount] = useState(props.postDetails.number_of_likes);
  const id = useSelector(store => store.userDetails.id);
  const dispatch = useDispatch()

  function handleLike() {
    if (id) {
      editPost(id, props.postDetails.id, 'like', null, data => {
        data.status === 200 ? dispatch(likepost(props.postDetails.id, data.newLikeCount)) : console.error('some error');
        data.status === 200 ? setLikeCount(data.newLikeCount) : console.error('some error');
      })
    } else setRedirect(true)
  }


  if (!toRedirect) {
    return (
      <div className="post my-4">
        <div className="post__header">
          <img src={`http://localhost:8000${props.postDetails.posterPicture}`} alt="" className='img-responsive img-fluid img-rounded' />
          <div className="poster__details">
            <Link to = {`/view/user-profile/${props.postDetails.poster}`} className='font-weight-bold'>{props.postDetails.poster}</Link>
            <small>{getTimeDifference(props.postDetails.dateCreated)}</small>
          </div>
        </div>
        <hr />
        <p>{props.postDetails.content}</p>
        <div className="postImage">
          <img src={`http://localhost:8000${props.postDetails.image}`} alt="" className='img-responsive img-fluid' />
          <div className="likeButtons" onClick={handleLike}>
            <p className='like'><ThumbUpAltOutlined/>{likeCount}</p>
          </div>
        </div>
      </div>
    )
  } else {
    return <Redirect to='/login' />
  }
}
export default Post;