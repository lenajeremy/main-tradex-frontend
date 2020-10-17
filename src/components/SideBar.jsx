import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { editSidebar } from '../actions';
import { CreditCardTwoTone, EcoSharp, Person, ShoppingBasket, Add} from '@material-ui/icons';
import './styles/Sidebar.css';


function Sidebar(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector(store => store.userDetails);

  const active = useSelector(store => store.sideBar)

  function userTypeDeterminant() {
    return (
      <div className={`sideBar__links right ${active === 'cart' ? 'active' : ''}`}>
      <div className='top'></div>
      <div className='bottom'></div>
      {!userDetails.id ? userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to='/login'><ShoppingBasket/>Your Cart</Link> :
      <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/login'}><ShoppingBasket/>Your Store</Link> : 
      userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to={'/user/' + userDetails.id.toString() + '/cart'}><ShoppingBasket/>Your Cart</Link> :
      <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/user/' + userDetails.id.toString() + '/store'}><ShoppingBasket/>Your Store</Link>
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
          <Link onClick = {() => dispatch(editSidebar({ value: 'explore' }))} to='/'><EcoSharp/>Explore</Link>
        </div>
        <div className={`sideBar__links right ${active === 'profile' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'profile' }))} to={userDetails.id ? `user/${userDetails.id}/profile` :'/login'}><Person/>Your Profile</Link>
        </div>
        <div className={`sideBar__links left ${active === 'account' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'account' }))} to={userDetails.id ? `user/${userDetails.id}/account` : '/login' }><CreditCardTwoTone/>Your Account</Link>
        </div>
        {userTypeDeterminant()}
        <div className={`sideBar__links right ${active === 'advertise' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div>
          <Link onClick = {() => dispatch(editSidebar({ value: 'advertise' }))} to='/core/ads'><Add/>Advertise on TradeX</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar