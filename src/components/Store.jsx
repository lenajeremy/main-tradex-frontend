/* eslint-disable no-restricted-globals */
import React, {useState} from 'react'
import {Route, Redirect, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Product from './Product';
import {removeProductAction} from '../actions';
import {removeProduct as backendRemoval} from '../fetch';
import './styles/Product.css';
import Login from './Login';

function Store(props) {
  const dispatch = useDispatch()
  const products = useSelector(state=> state.products);
  const user_id = useSelector(state => state.userDetails.id)

  function removeProduct(productDetails){
    if(confirm('Are you sure you want to remove this product?')){
      dispatch(removeProductAction(productDetails));
      // backendRemoval(user_id, productDetails.id, data => {
      //   data.status === 200 ? console.log('the data has been removed') : console.log('');
      // });
    }
  }

  if(products){
    return (
      <div className = 'store'>
        <h5 className = 'text-center'>Your Products</h5>
        <div className = 'productsGrid'>
          <Link className = 'product' to ={`/user/${user_id}/store/product/new`}>
            <p className = 'plus'>+</p>
          </Link>
          <Route path = {/user\/[0-9]{1,}\/store\/product\/new/} exact component = {Login}/>
        {products.map((product, index) => <Product productRemover = {productDetails => removeProduct(productDetails)} key = {index} productDetails ={product} view = 'store'/>)}
        </div>
      </div>
    )
  }
  return <Redirect to = '/login'/>
}

export default Store

function NewProductForm(props){
  const [name, setName ] = useState('');
  const [count, setCount] = useState(0);
  const [image, setImage] = useState('');

  return(
    <p>Hello</p>
  )
}