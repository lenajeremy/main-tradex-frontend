/* eslint-disable no-restricted-globals */
import React from 'react';
import './styles/Product.css';
import {Close} from '@material-ui/icons';
import {motion} from 'framer-motion';

const Product = ({productDetails, view, productRemover}) =>{

  function advertiseProduct(event){
    alert(JSON.stringify(productDetails));
  }

  return(
    <motion.div key ={productDetails.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1}} exit={{ opacity: 0.5, scale: 0.5 }} className = 'product'>
      <div className="overlay"></div>
      <Close onClick = {()=>productRemover(productDetails)}/>

      <div className="background" style = {{backgroundImage: `url(http://localhost:8000${productDetails.image})`}}></div>
      {/* <div className="main">
        <p>{productDetails.id}</p>
        <p>{productDetails.name}</p>
      </div> */}
      <div className="content">
        <p>{productDetails.id}</p>
        <h5>{productDetails.name}</h5>
        <h5>${productDetails.price}</h5>
        <h5><strong>x</strong>{productDetails.currentStock}</h5>
        <button className = 'btn btn-danger btn-sm' onClick = {()=>productRemover(productDetails)}>{view === 'store' ? 'Remove from Store' : "Remove Product"}</button>
        {view === 'store' ? <button className = 'btn btn-sm btn-primary' onClick = {advertiseProduct}>Advertise Product</button> : ''}
      </div>
    </motion.div>
  )
}

export default Product