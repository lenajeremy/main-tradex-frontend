import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Close} from '@material-ui/icons';
import {Link } from 'react-router-dom';
import './styles/newproduct.css';
import {TextField, FormControlLabel, Button, LinearProgress, Grid } from '@material-ui/core';
import {createNewProduct } from '../fetch';
import {useSelector, useDispatch} from 'react-redux';
import {newProduct} from '../actions';

function NewProductForm(props){
  const user_id = useSelector(state => state.userDetails.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const overlay = document.createElement('div');
    overlay.className = 'formOverlay';
    document.querySelector('#root').appendChild(overlay);

    return () => {
      clearInterval(animation);
      overlay.style.opacity = '0'
      overlay.addEventListener('transitionend', function gohome(){
        overlay.removeEventListener('transitionend', gohome);
        overlay.remove();
      });
    }
  },[]);

  const [name, setName ] = useState('');
  const [count, setCount] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [clicked, setClicked] = useState(false);
  const [price, setPrice] = useState(0);

  function handleClick(event){
    event.preventDefault()
    event.target.innerText === '-' ? count - 1 < 0 ? setCount(count) : setCount(count - 1): setCount(count + 1);
  }

  function getRandomColors(){
    let color = '#';
    let colorValues = 'abcdef0123456789'.split('');
    for(let i = 0; i < 6; i++){
        color+=colorValues[Math.floor(Math.random() * colorValues.length)]
    }
    return color
}

  function handleFormSubmission(event){
    event.preventDefault();
    setClicked(true);
    setInterval(animation,2100);
    createNewProduct(user_id, name, description, count, price, image, data =>{
      if(data.status === 200){
        clearInterval(animation);
        dispatch(newProduct({quantity: 'single', value: data.details}));
        setClicked(false);
      }
    })
    console.log(name, count, image, description);
  }
  const animation = () =>{document.querySelector('.MuiLinearProgress-barColorPrimary').style.background = getRandomColors(); console.log('animation')}

  return(
    <AnimatePresence>
    <motion.div className = 'productAddForm' initial = {{x:'-50%', y: '-50%', scale: 0, opacity: 0}} animate = {{ scale: 1, opacity: 1, x: '-50%', y: '-50%'}} exit = {{scale: 0, opacity: 0, x: '-50%', y: 0}}>
      {clicked ? <LinearProgress variant= 'indeterminate' color ='primary' /> : ''}
      <Link className = 'back__to__store' to = '/user/2/store'><Close /></Link>
      <form onSubmit = {handleFormSubmission} className = 'mt-2'>
        <h4 className = 'font-weight-lighter'>New Product</h4>
      <Grid container spacing={2} className = 'mt-4'>
              <Grid item lg={12}>
                <TextField
                  name='product_name'
                  variant='outlined'
                  required
                  value = {name}
                  fullWidth
                  id='product_name'
                  label="Your Product's Name"
                  autoFocus
                  onChange={event => setName(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg = {12}>
                <textarea 
                  id  = 'product_change'
                  name = 'product_description'
                  value = {description}
                  onChange = {event => setDescription(event.target.value)} 
                  placeholder = 'Enter product details'
                  rows = '3'
                />
              </Grid>
            </Grid>
        <button onClick = {handleClick}>-</button>
        <input type = 'text' name = 'count' id = 'product__count' value = {count} readOnly/>
        <button onClick = {handleClick}>+</button>
        <input type = 'file' accept = 'image/*' name = 'product__image' onChange = {event => setImage(event.target.files[0])}/>
        <input type = 'number' name = 'price' value = {price} onChange= {event => setPrice(event.target.value)}/>
        <button type = 'submit'>Create Product</button>
      </form>
    </motion.div>
    </AnimatePresence>
  )
}
export default NewProductForm;