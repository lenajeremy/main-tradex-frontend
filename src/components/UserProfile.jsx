import React, { useState /* , useRef */ } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, Redirect, useHistory } from 'react-router-dom';
// import { profileChange } from '../actions';
import {editUser, backendAPI, getUser} from '../fetch';
import {/* Settings,Edit, */ CameraAlt, ArrowBackIos } from '@material-ui/icons';
import {Button} from '@material-ui/core';
import './styles/Profile.css';
import {editPictures} from '../actions';
import Post from './Post'


function ProfileImage({ image, userName, id, changeHandler, self}) {
  return (
    <div className="profile__image" style = {{backgroundImage: `url(${ image})`}}>
      <img className = 'img-responsive img-fluid' src={`${image}`} alt={userName} />
      {self ? <React.Fragment>
      <CameraAlt className = 'profile__change__svg'/>
      <input id = 'profileChange' type = 'file' accept = 'image/*' name = 'profilePicture' onChange = {({target}) => changeHandler(id, target.name, target.files[0])}/>
      </React.Fragment> : ''}
    </div>
  )
}

function UserProfile(props) {
  let user = useSelector(store => store.userDetails);
  const [userState, setuserState] = useState(props.self ? user : {userName: "Loading", profile: {status: 'Loading', bio: 'Loading'}, postsMade: []});
  const history = useHistory()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getUser(props.routeProps.match.params.userId, data => setuserState(data.user)),[])

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
            <div className = 'cover_picture' style = {{backgroundImage: `url(${userState.coverPicture})`}}>
              <ArrowBackIos className = 'back' onClick = {() => history.goBack()}/>
              <img src = {userState.coverPicture} alt = {userState.userName}/>
              {props.self ? <React.Fragment><CameraAlt/><input type = 'file' accept = 'image/*' name = 'coverPicture' onChange = {({target}) => editProfile(userState.id, target.name, target.files[0])}/></React.Fragment>: ''}
            </div>
            {userState.userType === 'seller' ? <Button variant = 'outlined' color = 'primary' size = 'small'><Link to = {`/view/user/store/${userState.userName}`}>View Store</Link></Button> : ''}
            <div className= 'profile__details'>
              <ProfileImage userName={userState.userName} image={userState.profilePicture} id = {userState.id} changeHandler = {(id, field, value) => editProfile(id, field, value)} self ={props.self}/>
              <div className="details">
                <h4><Link to ={`/view/user-profile/${userState.id}`}>{userState.userName}</Link></h4>
                <p className='lead'>{userState.profile.status}</p>
              </div>
            </div>
          </div>
          <p className = 'text-center my-2 bio'>{userState.profile.bio}</p>
          
        </div>
      {/* <EditProfile /> */}
      {userState.postsMade.map((post, index) => <Post key = {index} postDetails = {post}/>)}
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