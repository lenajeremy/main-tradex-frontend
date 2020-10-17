import React from 'react'
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Product from './Product';
import './styles/Product.css';

function Cart(props) {
  let allproducts = useSelector(state => state.userDetails.cart);

  if(allproducts){
    let {products} = allproducts;
    return (
      <div className = 'cart'>
        <div className = 'productsGrid'>
        {products.map((product, index) => <Product key = {index} productDetails ={product} view = 'cart'/>)}
        </div>
      </div>
    )
  }
  return <Redirect to = '/login'/>
}

export default Cart
