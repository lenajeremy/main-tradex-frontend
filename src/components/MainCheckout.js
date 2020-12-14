import React from 'react';
import { Edit, ArrowBackIos, ShoppingCart } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import {Radio, Button} from '@material-ui/core';
// import {Typography} from '@material-ui/core';


function MainCheckout() {
  const history = useHistory();
  const [address, setAddress] = React.useState('home');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [email, setEmail] = React.useState('jeremiahlena13@gmail');
  const [price, setPrice] = React.useState(10000);
  const [publicKey, setpublicKey] = React.useState('pk_test_e8393cf34f27bc6b1435965dfaad63d0d57c62f3');



  return (
    <form className = 'maincheckout'>
      <div className="top d-flex align-items-center" initial = {{opacity: 0, x: -10}} animate = {{opacity: 1, x: 0}}>
        <div className = 'd-flex align-items-center' onClick = {() => history.goBack()}>
          <ArrowBackIos />
          <p>Checkout</p>
        </div>
        <ShoppingCart/>
      </div>
      <div className = 'checkoutAddress'>
        <p className = 'heading'>Shipping Address</p>
        <ShippingAddress 
          isActive = {address === 'home'}
          name = 'Home' 
          location = 'Lubokun Street, Ikola, Lagos' 
          number = '08174409628'
          editAddress = {value => setAddress(value)}
        />
        <ShippingAddress 
          isActive = {address === 'office'}
          name = 'Office' 
          location = 'University of Lagos, Biobaku Hall' 
          number = '08174409628'
          editAddress = {value => setAddress(value)}
        />
        <p className = 'heading'>Payment Method</p>
        <div className = 'payment_method'>
          <Radio onChange = {() => setPaymentMethod('paypal')}  checked = {paymentMethod === 'paypal'}/> <p>Paypal</p>
        </div>
        <div className = 'payment_method'>
          <Radio onChange = {() => setPaymentMethod('card')}  checked = {paymentMethod === 'card'}/> <p>Credit Card</p>
        </div>
        <div className = 'payment_method'>
          <Radio onChange = {() => setPaymentMethod('apple')} checked = {paymentMethod === 'apple'} /><p>Apple Pay</p>
        </div>
        <div className = 'payment_method'>
          <Radio onChange = {() => setPaymentMethod('paystack')}  checked = {paymentMethod === 'paystack'} /> <p>Paystack</p>
        </div>
      </div>
      <Button type= "submit" variant = 'contained' color= 'primary'/>
    </form>
  )
}


function ShippingAddress(props){
 return(
  <div className = {`shipping_address mb-2 ${props.isActive ? 'active' : ''}`} id = {props.name.toLowerCase()}>
  <Radio className= 'p-0' onChange = {()=> props.editAddress(props.name.toLowerCase())} checked = {props.isActive}/>
  <div>
 <p className = 'place'>{props.name}</p>
 <p className = 'address'>{props.location}</p>
    <p className = 'address'>{props.number}</p>
    <Edit className = 'editSvg'/>
  </div>
</div>
 ) 
}
export default MainCheckout

