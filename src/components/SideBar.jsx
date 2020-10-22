import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { editSidebar } from '../actions';
import { CreditCardOutlined, HomeOutlined, PersonOutlined, ShoppingBasketOutlined, Add, Home, Person, ShoppingBasket, CreditCard} from '@material-ui/icons';
import './styles/Sidebar.css';


function Sidebar(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector(store => store.userDetails);

  const active = useSelector(store => store.sideBar)

  function userTypeDeterminant() {
    const isActive = ()=>{
      if(active === 'cart' || active === 'store') return true
      return false
    }
    
    if(isActive()){
      return(
      <div className='sideBar__links right active'>
        <div className='top'></div>
        <div className='bottom'></div>
        {!userDetails.id ? userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to='/login'><ShoppingBasket/><span className = 'text'>Your Cart</span></Link> :
        <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/login'}><ShoppingBasket/><span className = 'text'>Your Store</span></Link> : 
        userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to={'/user/' + userDetails.id.toString() + '/cart'}><ShoppingBasket/><span className = 'text'>Your Cart</span></Link> :
        <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/user/' + userDetails.id.toString() + '/store'}><ShoppingBasket/><span className = 'text'>Your Store</span></Link>
        }
      </div>
      )
    }
    return(
      <div className='sideBar__links right'>
        <div className='top'></div>
        <div className='bottom'></div>
        {!userDetails.id ? userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to='/login'><ShoppingBasketOutlined/><span className = 'text'>Your Cart</span></Link> :
        <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/login'}><ShoppingBasketOutlined/><span className = 'text'>Your Store</span></Link> : 
        userDetails.userType === 'buyer' ? <Link onClick = {() => dispatch(editSidebar({ value: 'cart' }))} to={'/user/' + userDetails.id.toString() + '/cart'}><ShoppingBasketOutlined/><span className = 'text'>Your Cart</span></Link> :
        <Link onClick = {() => dispatch(editSidebar({ value: 'store' }))} to={'/user/' + userDetails.id.toString() + '/store'}><ShoppingBasketOutlined/><span className = 'text'>Your Store</span></Link>
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
          <Link onClick = {() => dispatch(editSidebar({ value: 'explore' }))} to='/'>{active === 'explore' ? <Home/>: <HomeOutlined/>}<span className = 'text'>Explore</span></Link>
        </div>
        <div className={`sideBar__links right ${active === 'profile' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'profile' }))} to={userDetails.id ? `/user/${userDetails.id}/profile` :'/login'}>{active === 'profile' ? <Person/> : <PersonOutlined/>}<span className = 'text'>Your Profile</span></Link>
        </div>
        <div className={`sideBar__links left ${active === 'account' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div> 
          <Link onClick = {() => dispatch(editSidebar({ value: 'account' }))} to={userDetails.id ? `/user/${userDetails.id}/account` : '/login' }>{active === 'account' ? <CreditCard/> :<CreditCardOutlined/>}<span className = 'text'>Your Account</span></Link>
        </div>
        {userTypeDeterminant()}
        <div className={`sideBar__links right ${active === 'advertise' ? 'active' : ''}`}>
            <div className='top'></div>
            <div className='bottom'></div>
          <Link onClick = {() => dispatch(editSidebar({ value: 'advertise' }))} to='/core/ads'><Add/><span className = 'text'>Advertise on TradeX</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar