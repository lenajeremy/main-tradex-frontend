import React from 'react';
import { Link } from 'react-router-dom';
import Person from '@material-ui/icons/Person';
import './styles/Header.css';
import {useSelector } from 'react-redux';

function Header(props) {
  const userDetails=useSelector(store => store.userDetails)

  return (
    <header>
      <nav className='navbar navbar-expand-sm'>
        <div className="container header">
          <Link to='/' className='navbar-brand'>TradeX</Link>
          <ul className="navbar-nav ml-auto">
            <li className='nav-item'><Link to='/' className='nav-link'>Home</Link></li>
            <li className='nav-item'><Link to='/login' className='nav-link'>Sign In</Link></li>
            <li className='nav-item'><Link to='/register' className='nav-link'>Sign Up</Link></li>
            <li className='nav-item'><Link to = {userDetails.id? `/user/${userDetails.id}/profile`: '/login'} className = 'd-flex align-items-center nav-link'><Person/>{userDetails.userName || 'Not Signed In'}</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;