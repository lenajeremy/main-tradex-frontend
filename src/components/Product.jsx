/* eslint-disable no-restricted-globals */
import React from 'react';
import './styles/Product.css';
import {Close} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import {backendAPI} from '../fetch';
import {useSelector} from 'react-redux';

const Product = ({productDetails, view, manage, self}) =>{
  const products = useSelector(store => store.products);

  // function advertiseProduct(event){
  //   alert(JSON.stringify(productDetails));
  // }
  const incart = () => products.findIndex(product => product.id === productDetails.id) !== -1;

  return(
    <motion.div key ={productDetails.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0.5, scale: 0.5 }} className = 'product'>
      <div className="overlay"></div>
      {self ? <Close onClick = {()=>manage(productDetails, 'remove_from_cart')}/> : ''}
      <div className="background" style = {{backgroundImage: `url(${ backendAPI + productDetails.image})`}}></div>
      <div className="content">
        <h5 className = 'mb-2 mt-4'>{productDetails.name}</h5>
        <h5>Price: NGN{productDetails.price}</h5>
        <h6>Amount Available: {productDetails.currentStock}</h6>
        <Link to = {`/product/${productDetails.id}`}><Button variant = 'contained' color = 'primary' size = 'small'>Details</Button></Link>
        <Button variant = 'contained'  color = 'secondary' size = 'small' disabled = {incart() && !self} onClick = {() => manage(productDetails, incart() ? 'remove_from_cart' : 'add_to_cart')}>{view === 'store' ? 'Remove' : self  ? "Remove" : incart() ? "In Cart" : "Add to Cart"}</Button>
      </div>
    </motion.div>
  )
}

export default Product