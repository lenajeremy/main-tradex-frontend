/* eslint-disable no-restricted-globals */
import React from 'react'
import {Route, Redirect, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Product from './Product';
import {removeProductAction} from '../actions';
import {removeProduct as backendRemoval} from '../fetch';
import './styles/Product.css';
import NewProductForm from './NewProductForm';
import emptyStoreImage from '../empty.svg';
import {ArrowBackIos} from '@material-ui/icons';
import {Button} from '@material-ui/core';

function Store(props) {
  const dispatch = useDispatch();
  const products = useSelector(state=> state.products);
  const user_id = useSelector(state => state.userDetails.id);
  const history = useHistory();

  function removeProduct(productDetails){
    if(confirm('Are you sure you want to remove this product?')){
      dispatch(removeProductAction(productDetails));
      backendRemoval(user_id, productDetails.id, data => {
        data.status === 200 ? console.log('the data has been removed') : console.log('');
      });
    }
  }

  if(products){
    return (
      <div className = 'store cart container'>
        <div className="top d-flex align-items-center">
          <div className = 'd-flex align-items-center' onClick = {() => history.goBack()}>
            <ArrowBackIos />
            <p>Your Products</p>
          </div>
        </div>
        <div className = 'productsGrid' style = {products.length === 0 ? {flexDirection: 'column'} : null}>
        <Route path = '/user/:userId/store/products/new' exact component = {NewProductForm}/>
        {products.length === 0 ? 
        <React.Fragment>
            <img className = 'no-product-image' src = {emptyStoreImage} alt = {emptyStoreImage} />
            <h5>You have not added any product to your store</h5>
            {props.self ? <Button type = 'contained'>Add products now</Button> : ''}
        </React.Fragment> : products.map((product, index) => <Product index = {index} self = {props.self} manage = {productDetails => removeProduct(productDetails)} key = {index} productDetails ={product} view = 'store'/>)}
        </div>
      </div>
    )
  }
  return <Redirect to = '/login'/>
}

export default Store;