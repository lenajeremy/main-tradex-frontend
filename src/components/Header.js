import React from 'react';
import { Link } from 'react-router-dom';
import useUrl from '../hooks/useProfileUrl';
import './styles/Header.css';
import {useSelector } from 'react-redux';

function Header(props) {
  const userDetails=useSelector(store => store.userDetails)
  const appropriateUrl = useUrl();

  return (
    <header>
      <div className = 'container'>
        <nav className='navbar navbar-expand-sm d-flex justify-content-between'>
          <Link to='/' className='navbar-brand'>TradeX</Link>
          <Link to = {userDetails.id? `/user/${userDetails.id}/profile`: '/login'} className = 'd-flex align-items-center nav-link'>
            {userDetails.id ?
            <div className = 'd-flex align-items-center'>
              <div className = 'profile_avatar' style = {{marginRight: 20, backgroundImage: `url(${appropriateUrl(userDetails.profilePicture)})`}}>
              </div>
              <Link to = '/login'>Logout</Link>
            </div>:
              'Not Signed In'
            }
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;