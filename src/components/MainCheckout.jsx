import React from 'react';
import { Edit, ArrowBackIos, ShoppingCart } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import {Radio} from '@material-ui/core';
import { motion } from 'framer-motion';


function MainCheckout() {
  const history = useHistory();
  const [address, setAddress] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');

  return (
      <form className = 'maincheckout'>
        <motion.div className="top d-flex align-items-center" initial = {{opacity: 0, x: -10}} animate = {{opacity: 1, x: 0}}>
          <div className = 'd-flex align-items-center' onClick = {() => history.goBack()}>
            <ArrowBackIos />
            <p>Checkout</p>
          </div>
          <ShoppingCart/>
        </motion.div>
        <div className = 'checkoutAddress'>
          <p className = 'heading'>Shipping Address</p>
<div className = 'shipping_address'>
  <Radio onChange = {()=> setAddress('home')} checked = {address === 'home'}/>
  <p>23, Lubokun street, ikola odunsi</p>
  <p>Ipaja Lagos</p>
  <p>08040020335</p>
  <Edit/>
</div>
<div className = 'shipping_address'>
<Radio onChange = {()=> setAddress('office')} checked = {address === 'office'}/>
  <p>23, Lubokun street, ikola odunsi</p>
  <p>Ipaja Lagos</p>
  <p>08040020335</p>
  <Edit/>
</div>
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
    </form>
  )
}

export default MainCheckout

