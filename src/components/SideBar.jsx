import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { editSidebar } from '../actions';
import { motion } from 'framer-motion';
import { MailOutline, HomeOutlined, PersonOutlined, ShoppingBasketOutlined, Notifications, NotificationsOutlined, Home, Person, ShoppingBasket, Mail } from '@material-ui/icons';
import './styles/Sidebar.css';


function Sidebar(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector(store => store.userDetails);

  const products = useSelector(store => store.products);

  const active = useSelector(store => store.sideBar)

  function userTypeDeterminant() {
    const isActive = () => {
      if (active === 'cart' || active === 'store') return true
      return false
    }

    if (isActive()) {
      return (
        <div className='sideBar__links right active'>
          <div className='top'></div>
          <div className='bottom'></div>
          {!userDetails.id ? userDetails.userType === 'buyer' ? <Link onClick={() => dispatch(editSidebar({ value: 'cart' }))} to='/login'><ShoppingBasket /><motion.span className='text'>Cart</motion.span></Link> :
            <Link onClick={() => dispatch(editSidebar({ value: 'store' }))} to={'/login'}><ShoppingBasket /><motion.span className='text'>Store</motion.span></Link> :
            userDetails.userType === 'buyer' ? <Link onClick={() => dispatch(editSidebar({ value: 'cart' }))} to={'/user/' + userDetails.id.toString() + '/cart'}><ShoppingBasket /><motion.span className='text'>Cart<span className='products_length'>{products.length}</span></motion.span></Link> :
              <Link onClick={() => dispatch(editSidebar({ value: 'store' }))} to={'/user/' + userDetails.id.toString() + '/store'}><ShoppingBasket /><motion.span className='text'>Store</motion.span><span className='products_length'>{products.length}</span></Link>
          }
        </div>
      )
    }
    return (
      <div className='sideBar__links right'>
        <div className='top'></div>
        <div className='bottom'></div>
        {!userDetails.id ? userDetails.userType === 'buyer' ? <Link onClick={() => dispatch(editSidebar({ value: 'cart' }))} to='/login'><ShoppingBasketOutlined /><motion.span className='text'>Cart</motion.span></Link> :
          <Link onClick={() => dispatch(editSidebar({ value: 'store' }))} to={'/login'}><ShoppingBasketOutlined /><motion.span className='text'>Store</motion.span></Link> :
          userDetails.userType === 'buyer' ? <Link onClick={() => dispatch(editSidebar({ value: 'cart' }))} to={'/user/' + userDetails.id.toString() + '/cart'}><ShoppingBasketOutlined /><motion.span className='text'>Cart<span className='products_length'>{products.length}</span></motion.span></Link> :
            <Link onClick={() => dispatch(editSidebar({ value: 'store' }))} to={'/user/' + userDetails.id.toString() + '/store'}><ShoppingBasketOutlined /><motion.span className='text'>Store</motion.span><span className='products_length'>{products.length}</span></Link>
        }
      </div>
    )
  }
  return (
    <div className='sideBar'>
      <div className='links'>
        <div className={`sideBar__links left ${active === 'explore' ? 'active' : ''}`}>
          <div className='top'></div>
          <div className='bottom'></div>
          <Link onClick={() => dispatch(editSidebar({ value: 'explore' }))} to='/'>{active === 'explore' ? <Home /> : <HomeOutlined />}<motion.span className='text'>Explore</motion.span></Link>
        </div>
        <div className={`sideBar__links right ${active === 'profile' ? 'active' : ''}`}>
          <div className='top'></div>
          <div className='bottom'></div>
          <Link onClick={() => dispatch(editSidebar({ value: 'profile' }))} to={userDetails.id ? `/user/${userDetails.id}/profile` : '/login'}>{active === 'profile' ? <Person /> : <PersonOutlined />}<motion.span className='text'>Profile</motion.span></Link>
        </div>
        <div className={`sideBar__links left ${active === 'message' ? 'active' : ''}`}>
          <div className='top'></div>
          <div className='bottom'></div>
          <Link onClick={() => dispatch(editSidebar({ value: 'message' }))} to={userDetails.id ? `/messages` : '/login'}>{active === 'message' ? <Mail /> : <MailOutline />}<motion.span className='text'>Chats</motion.span></Link>
        </div>
        {userTypeDeterminant()}
        <div className={`sideBar__links right ${active === 'notifications' ? 'active' : ''}`}>
          <div className='top'></div>
          <div className='bottom'></div>
          <Link onClick={() => dispatch(editSidebar({ value: 'notifications' }))} to='/notifications'>{active === 'notifications' ? <Notifications /> : <NotificationsOutlined />}<motion.span className='text'>Notfcatns</motion.span></Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar