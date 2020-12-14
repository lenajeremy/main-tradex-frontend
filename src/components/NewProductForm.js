import React, { useState, useEffect } from 'react';
import {Close} from '@material-ui/icons';
import {Link } from 'react-router-dom';
import './styles/newproduct.css';
import {TextField, Button, LinearProgress, Grid } from '@material-ui/core';
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

    return () => overlay.remove();
  },[]);

  const [name, setName ] = useState('');
  const [count, setCount] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [clicked, setClicked] = useState(false);
  const [price, setPrice] = useState(0);
  const [error, setError ] = useState({bool: false, value: null});

  function handleClick(event){
    event.preventDefault()
    event.target.innerText === '-' ? count - 1 < 0 ? setCount(count) : setCount(count - 1): setCount(count + 1);
  }
  function handleFormSubmission(event){
    event.preventDefault();
    if(!(price && description && image && name && count)){
      setError({bool: true, values: ['Please fill the required fields!!']});
    }else{
      setClicked(true);
      createNewProduct(user_id, name, description, count, price, image, data =>{
        if(data.status === 200){
          dispatch(newProduct({quantity: 'single', value: data.details}));
          setClicked(false);
          setName('');
          setDescription('');
          setPrice(0);
          setCount(0);
        }
      })
    }
  }

  return(
    <div className = 'productAddForm'>
      {clicked ? <LinearProgress variant= 'indeterminate' color ='primary' /> : ''}
      <Link className = 'back__to__store' to = '/user/2/store'><Close /></Link>
      <form onSubmit = {handleFormSubmission} className = 'mt-2'>
        <h4 className = 'font-weight-lighter'>New Product</h4>
      <Grid container spacing={2} className = 'mt-2 mt-md-4'>
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
                  rows = '2'
                />
              </Grid>
            </Grid>
        <button onClick = {handleClick}>-</button>
        <input type = 'text' name = 'count' id = 'product__count' value = {count} readOnly/>
        <button onClick = {handleClick}>+</button>
        <input type = 'file' multiple accept = 'image/*' name = 'product__image' onChange = {event => setImage(event.target.files[0])}/>
        <input type = 'number' name = 'price' value = {price} onChange= {event => setPrice(event.target.value)}/>
        <Grid container spacing = {1}>
          <Button className = 'btn btn-block' variant = 'contained' color= 'primary' type = 'submit'>Create Product</Button>
        </Grid>
        {error.bool ? error.values.map((message, index) => <p className = 'text-center text-danger small' key = {index}>{message}</p>) : ''}
      </form>
    </div>
  )
}
export default NewProductForm;