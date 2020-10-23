import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, Redirect } from 'react-router-dom';
import { profileChange } from '../actions';
import {editUser, backendAPI} from '../fetch';
import {Settings,Edit, CameraAlt } from '@material-ui/icons';
import './styles/Profile.css';
import {editPictures} from '../actions';
import Post from './Post'

function ProfileImage({ image, userName, id, changeHandler}) {
  return (
    <div className="profile__image" style = {{backgroundImage: `url(${image})`}}>
      <img className = 'img-responsive img-fluid' src={`${image}`} alt={userName} />
      <CameraAlt className = 'profile__change__svg'/>
      <input id = 'profileChange' type = 'file' accept = 'image/*' name = 'profilePicture' onChange = {({target}) => changeHandler(id, target.name, target.files[0])}/>
    </div>
  )
}

function UserProfile() {
  const user = useSelector(store => store.userDetails);
  const editProfileUrl = (url) => backendAPI + url;
  const dispatch = useDispatch();

  function editProfile(id, field, value){
    editUser(id, {field, value: {image: value, imageName: value.name}}, data => {
      if(data.status === 200){
        dispatch(editPictures({name: field, value: data.edited}))
      }
    });
  }
  if (user.id) {
    return (
      <div className='userProfile'>
        <div className="profile">
          <div className="top">
            <div className = 'cover_picture' style = {{backgroundImage: `url(${editProfileUrl(user.coverPicture)})`}}>
              <img src = {editProfileUrl(user.coverPicture)} alt = {user.userName}/>
              <CameraAlt/>
              <input type = 'file' accept = 'image/*' name = 'coverPicture' onChange = {({target}) => editProfile(user.id, target.name, target.files[0])}/>
            </div>
            <div className= 'profile__details'>
              <ProfileImage userName={user.userName} image={editProfileUrl(user.profilePicture)} id = {user.id} changeHandler = {(id, field, value) => editProfile(id, field, value)}/>
              <div className="details">
                <h4><Link to ={`/user/${user.id}/profile'`}>{user.userName}<span role='img' aria-labelledby='img'>💎</span></Link></h4>
                <p className='lead'>{user.profile.status}</p>
              </div>
            </div>
          </div>
          <p className = 'bio'>{user.profile.bio}</p>
          
        </div>
      {/* <EditProfile /> */}
      </div>
    )
  } else return <Redirect to='/login' />
}


// function EditProfile() {

//   const dispatch = useDispatch();
//   const userDetails = useSelector(state => state.userDetails);
  
//   const [newbio, setNewBio] = useState(userDetails.profile.bio);
//   const [newstatus, setNewStatus] = useState(userDetails.profile.status);
//   const [profileImage, setProfileImage] = useState(null);
//   const [errors, setErrors] = useState(false);

//   function handleFormSubmission(event) {
//     event.preventDefault();
//     if(newbio && newstatus){
//       editUser(userDetails.id, newstatus, newbio, profileImage, data => {
//         if (data.status === 200) {
//           dispatch(profileChange({ bio: newbio, status: newstatus }));

//         } else setErrors(true)
//       })
//     }
//   }
//   return (
//       <form onSubmit={handleFormSubmission}>
//         {errors ? <p>Error! Your profile could not be edited</p> : ''}
//         <input type='text' value={newstatus} placeholder='Edit your status' onChange={event => setNewStatus(event.target.value)} />
//         <textarea value={newbio} placeholder='What you want the public to know about you?' onChange={e => setNewBio(e.target.value)} />
//         <input type='file' accept='image/*' className='form-control' onChange={e => setProfileImage(e.target.files[0])} />
//         <input type='submit' className='btn btn-primary btn-block' value='Update Profile' />
//       </form>
//   )

// }
// window.open(`https://twitter.com/intent/tweet?text=Thank%20you%20@theabbiee%20for%20writing%20this%20helpful%20article%2e%0A%0AEverything%20You%20Need%20to%20Know%20About%20Cookies%20for%20Web%20Development%0A%0Ahttps%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Feverything-you-need-to-know-about-cookies%2F`, 'share-twitter', 'width=550, height=235'); return false;
export default UserProfile;