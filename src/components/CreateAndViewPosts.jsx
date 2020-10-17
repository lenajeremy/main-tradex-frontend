import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { createPost, fetchposts } from '../actions';
import Post from './Post';
import { createNewPost, getAllPosts } from '../fetch';
import {TextareaAutosize, CircularProgress} from '@material-ui/core';
import {AddAPhoto, CheckSharp} from '@material-ui/icons';
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
  const [isCreated, setCreated] = useState(false);

  function handleFormSubmission(event) {
    event.preventDefault();
    if(user_id){
      if(!postContent && isValidImage){
        setError('Please type something and try again');
      }else{
        createNewPost(user_id, postContent, postImage, data => {
          if(data.status === 200){
            setCreated(true);
            setPostImage('');
            setPostContent('');
            dispatch(createPost(data.post_details));
          }else setError('An error occurred but you don\'t need to fret, we are working it out already');
        });
      }
    }else setRedirect(true);
  }
  // change the content of the post button to text when sending another post
  useEffect(() => setCreated(false),[postContent, postImage]);

  function isValidImage(imageFile){
    if(!imageFile){
      return true
    }else{
      const name = imageFile.name;
      const ext = name.split('.')[1];
      const validExtension = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
      return validExtension.indexOf(ext) === -1 ? false: true
    }
  }

  if (!toRedirect) {
    return (
      <React.Fragment>
        <form onSubmit={handleFormSubmission} className = 'mb-4' id = 'createForm'>
          <TextareaAutosize id = 'create_textarea' name = 'post_content' value = {postContent} onChange = {event => setPostContent(event.target.value)} placeholder = {`What's going on ${user_id ? user.firstName : ''}??`} />
          <div className = 'stuff'>
          <div className="imageCreate">
          <input id = 'create' name='postImage' type='file' accept='image/*' onChange={event => setPostImage(event.target.files[0])} />
          <div className="postCreatorImage"><AddAPhoto /></div>
          </div>
          <span id = 'message'>Text Ain't Enough? Add an Image</span>
          <button id = 'createFormButton' type='submit'>{isCreated ? <CheckSharp className = 'post_sent'/> : 'POST'}</button>
          </div>
        </form>
        {error ? <p className = 'text-danger text-center'>{error}</p> : ''}
      </React.Fragment>
    )
  } else {
    return <Redirect to='/login' />
  }
}

function AllPosts(props) {
  const allPosts = useSelector(store => store.posts)
  const [lastPost, setLastPost] = useState(allPosts.length === 0 ? 1 : allPosts.length);
  const [loading, setLoading] = useState(true);
  let lastPostRef = useRef(lastPost);

  const setLastPostValue = (value) =>{
    lastPostRef.current = value;
    setLastPost(value);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    getAllPosts(lastPostRef.current, data => dispatch(fetchposts(data.posts)));
  },[]);

  useEffect(() => setLastPostValue(allPosts.length),[allPosts]);

  let scrollEvent = () =>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
      setLoading(true);
      window.removeEventListener('scroll', scrollEvent);
      getAllPosts(lastPostRef.current + 1, data => {
        dispatch(fetchposts(data.posts));
        setLoading(false);
        window.addEventListener('scroll', scrollEvent);
      });
    }
  }

  return (
    <React.Fragment>
      <h1>Posts</h1>
      { allPosts.map((post, index) => <Post key={index} postDetails={post} />)}
      {loading ? <CircularProgress variant = 'indeterminate' color = 'primary' id = 'loader'/> : ''}
    </React.Fragment>
  )

}

function WrapperFunction(props) {
  return (
    <React.Fragment>
      <CreatePosts />
      <AllPosts />
    </React.Fragment>
  )
}
export default WrapperFunction