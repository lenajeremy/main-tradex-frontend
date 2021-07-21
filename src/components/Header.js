import React from 'react';
import { Link } from 'react-router-dom';
import Person from '@material-ui/icons/Person';
import './styles/Header.css';
import {useSelector } from 'react-redux';

function Header(props) {
  const userDetails=useSelector(store => store.userDetails)

  return (
    <header>
      <div className = 'container'>
        <nav className='navbar navbar-expand-sm d-flex justify-content-between'>
          <Link to='/' className='navbar-brand'>TradeX</Link>
          <Link to = {userDetails.id? `/user/${userDetails.id}/profile`: '/login'} className = 'd-flex align-items-center nav-link'><Person/>{userDetails.userName || 'Not Signed In'}</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;