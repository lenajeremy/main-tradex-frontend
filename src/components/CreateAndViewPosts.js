import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { createPost, fetchposts, editSidebarVisibility } from '../actions';
import Post from './Post';
import { createNewPost, getAllPosts } from '../fetch';
import { TextareaAutosize, CircularProgress, Backdrop } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import './styles/Create.css';

function CreatePosts(props) {
  const [postContent, setPostContent] = useState('');
  const dispatch = useDispatch();
  const [postImage, setPostImage] = useState(null);
  const user = useSelector(store => store.userDetails);
  const user_id = user.id;
  const [toRedirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  function handleFormSubmission(event) {
    event.preventDefault();
    if (user_id) {
      if (!postContent && isValidImage) {
        setError('Please type something and try again');
      } else {
        createNewPost(user_id, postContent, postImage, data => {
          if (data.status === 200) {
            setPostImage('');
            setPostContent('');
            dispatch(createPost(data.post_details));
          } else setError('An error occurred but you don\'t need to fret, we are working it out already');
        });
      }
    } else setRedirect(true);
  }

  function isValidImage(imageFile) {
    if (!imageFile) {
      return true
    } else {
      const name = imageFile.name;
      const ext = name.split('.')[1];
      const validExtension = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
      return validExtension.indexOf(ext) === -1 ? false : true
    }
  }

  if (!toRedirect) {
    return (
      <form onSubmit={handleFormSubmission} id='createForm'>
        <div className='container'>
          <h4 className='mb-3'>Create a new post</h4>
          <TextareaAutosize id='create_textarea' name='post_content' value={postContent} onChange={event => setPostContent(event.target.value)} placeholder={`What's going on ${user_id ? user.firstName : ''}??`} />
          <div className='stuff'>
            <div className="imageCreate">
              <input id='create' name='postImage' type='file' accept='image/*' onChange={event => setPostImage(event.target.files[0])} />
              <div className="postCreatorImage"><Image /></div>
            </div>
            <button id='createFormButton' type='submit'>POST</button>
          </div>
          {error ? <p className='text-danger post_error text-center'>{error}</p> : ''}
        </div>
      </form>
    )
  } else {
    return <Redirect to='/login' />
  }
}

function AllPosts(props) {
  const allPosts = useSelector(store => store.posts)
  const [lastPost, setLastPost] = useState(allPosts.length === 0 ? 1 : allPosts.length + 1);
  const [loading, setLoading] = useState(true);
  let lastPostRef = useRef(lastPost);

  const setLastPostValue = (value) => {
    lastPostRef.current = value;
    setLastPost(value);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    getAllPosts(localStorage.getItem('user_id') || 0, lastPostRef.current, data => dispatch(fetchposts(data.posts)));
    return () => window.removeEventListener('scroll', scrollEvent);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setLastPostValue(allPosts.length + 1), [allPosts]);

  let scrollEvent = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setLoading(true);
      window.removeEventListener('scroll', scrollEvent);
      getAllPosts(localStorage.getItem('user_id') || 0, lastPostRef.current, data => {
        if (data.status === 200 && data.posts.length !== 0) {
          dispatch(fetchposts(data.posts));
          window.addEventListener('scroll', scrollEvent);
        } else {
          window.removeEventListener('scroll', scrollEvent);
        }
        setLoading(false);
      });
    }
  }

  return (
    <div className='container'>
      {allPosts.map((post, index) => <Post key={index} postDetails={post} />)}
      {loading ? <CircularProgress variant='indeterminate' color='primary' id='loader' /> : ''}
    </div>
  )

}

function WrapperFunction(props) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(editSidebarVisibility(true));
  })
  return (
    <React.Fragment>
      <CreatePosts />
      <AllPosts />
    </React.Fragment>
  )
}
export default WrapperFunction;