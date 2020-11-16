import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Redirect, Link} from 'react-router-dom';
import {Typography, Radio, Button} from '@material-ui/core';
import {ArrowBackIos, ShoppingCart} from '@material-ui/icons';
import {backendAPI, cartOperation} from '../fetch';
import {motion} from 'framer-motion';
import './styles/Checkout.css';
import {editProduct, removeProductAction} from '../actions';

export default function Checkout() {
  const history = useHistory();
  const products = useSelector(store => store.products);
  const user= useSelector(store => store.userDetails);
  
  
  const calculateTotal = (products) => products.length === 0 ? 0 : products.length === 1 ? products[0].price * products[0].currentStock : products.reduce((a, b) => typeof a === 'object' ? a.price * a.currentStock + b.price * b.currentStock : a + b.price * b.currentStock);
  const productsTotal = products => products.length === 0 ? products : products.map(product => product.currentStock).reduce((a, b) => a+b);

  const [total, setTotal]= React.useState(calculateTotal(products));
  const [number, setNumber ] = React.useState(productsTotal(products));

  React.useEffect(() => {setTotal(calculateTotal(products)); setNumber(productsTotal(products))},[products])
  
  if(user.userType === 'buyer'){
    return (
      <div className = 'checkout'>
        <motion.div className="top d-flex align-items-center" initial = {{opacity: 0, x: -10}} animate = {{opacity: 1, x: 0}}>
          <div className = 'd-flex align-items-center' onClick = {() => history.goBack()}>
            <ArrowBackIos />
            <p>Review Cart</p>
          </div>
          <ShoppingCart/>
          <Typography variant = 'body1' component = 'p'>{number}</Typography>
        </motion.div>
        
        {products.map((product, key) => <ProductLittle key = {key} stuff = {key} productDetails = {product}/>)}
        <div className="details container">
          <Link to = '/checkout/'><Button disabled = {products.length === 0} className = 'checkout__button' variant = 'contained' size = 'small' color = 'primary'>Checkout</Button></Link>
          <div className = 'd-flex justify-content-around'>
            <p className="price">TOTAL: N{formatCurrency(total)}</p>
            <p className="price">{number} items in cart</p>
          </div>
        </div>
      </div>
    )
  } return <Redirect to = {`/user/${user.id}/store`}/>
}

const formatCurrency = value =>{
  return value
}


function ProductLittle({productDetails, stuff}){

  const dispatch = useDispatch();
  const userId = useSelector(store => store.userDetails.id);

  function increaseProductOrder(operation){
    cartOperation(productDetails.id, userId, operation, data => {
      if(data.status === 200){
        operation === 'decrease' && productDetails.currentStock - 1 <= 0 ? dispatch(removeProductAction(productDetails)) : dispatch(editProduct({id: productDetails.id, currentStock: data.details.currentStock}))
      }
    })
  }
  return (
    <motion.div className = {stuff === 0 ? 'product_little d-flex mb-4' : 'product_little d-flex my-4'} initial = {{opacity: 0, y: 20}} animate = {{opacity: 1, y: 0}}>
      <div className="main d-flex align-items-center">
      <Radio/>
      <div className = 'product_little_image' style = {{backgroundImage: `url(${backendAPI + productDetails.image})`}}>
        <img className = 'img-responsive img-fluid' src = {backendAPI + productDetails.image} alt = {productDetails.description}/>
      </div>
      <div className="product_little_desc">
        <Typography component = 'p' variant = 'inherit' className = 'lilbold'>{productDetails.name}</Typography>
        <Typography component = 'p' variant = 'body2'>N{productDetails.price}</Typography>
      </div>
    </div>
    <div className="product_little_action d-flex">
      <button onClick = {() => increaseProductOrder('decrease')}><span className = 'content'>-</span></button>
      <Typography component = 'p' variant = 'body1'>{productDetails.currentStock}</Typography>
      <button onClick = {() => increaseProductOrder('increase')}><span className = 'content'>+</span></button>
    </div>
    </motion.div>
  );
}
