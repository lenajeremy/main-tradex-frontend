import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Lock} from '@material-ui/icons';
import{TextField, Typography, Container, FormControlLabel, Button, Checkbox, CircularProgress, Grid} from '@material-ui/core';
import { loginUser, getUser } from '../fetch';
import {editSidebarVisibility, login, profileChange, newProduct, initialMessages } from '../actions';
import { Redirect, Link } from 'react-router-dom';
import backgroundImage from '../assets/tradex.jpg';
import './styles/Login.css';

function Login(props) {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [toRedirect, setRedirect] = useState(false);
  const [submit, setSubmit ] = useState(false);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    dispatch(editSidebarVisibility(false))
  })
  function handleFormSubmission(event) {
    setSubmit(true);
    event.preventDefault();
    loginUser(userName, password, data => {
      if (data.status === 200) {
        getUser(data.id, true, userDetails => {
          console.log(data);
          dispatch(login(userDetails.user));
          dispatch(profileChange(userDetails.user.profile));
          dispatch(initialMessages(userDetails.user.latestMessages));
          userDetails.user.userType === 'buyer' ? dispatch(newProduct({quantity: 'batch', value: userDetails.user.cart.products})) : dispatch(newProduct({quantity: 'batch', value: userDetails.user.products.products}));
          localStorage.setItem('user_id', userDetails.user.id);
          setError(false);
          setRedirect(true);
        })
      } else setError(true);
      setSubmit(false);
    });
  }

  if (!toRedirect) {
    return (
      <Container component='main' maxWidth='xl' style = {{padding: 0}}>
        <div className = 'row login-row w-100'>
        <div className = 'col-md-6 login-left' style ={{background: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
          <p>Login to your account...</p>
        </div>
        <div className="login col-md-6 d-flex align-items-center">
          <div className = 'mx-auto'>
          <Typography component='h1' variant = 'h4' className = 'text-center justify-content-center mb-4 d-flex align-items-center color-primary'><Lock className = 'mr-3' style ={{width: '1.5em', height: '1.5em'}}/>Log in</Typography>
          {error ? <p className = 'text-danger text-center my-2'>Invalid Login Credentials</p> : ''}
          <form onSubmit={handleFormSubmission} className='login__form'>
            <Grid container spacing={1}>
              <Grid item lg={12}>
                <TextField
                  name='username'
                  variant='filled'
                  required
                  value = {userName}
                  fullWidth
                  id='username'
                  label='Username'
                  autoFocus
                  onChange={event => setuserName(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  name='password'
                  value = {password}
                  variant='filled'
                  required
                  fullWidth
                  id='password'
                  label='Password'
                  type={visible ? 'text' : 'password'}
                  onChange={event => setPassword(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" onChange = {() => setVisible(!visible)}/>}
                  label={visible ? 'Hide Password' : 'Show Password'}
                />
              </Grid>
            </Grid>
            <Button className = 'my-2' type="submit" fullWidth variant="contained" color='primary'>{submit ? <React.Fragment><CircularProgress variant = 'indeterminate' color = 'primary' id = 'login__loader'/></React.Fragment> : 'Log in'}</Button>
            <Grid container spacing={2} className = 'text-center'>
              <Grid item>
                <Link to='/register'>
                  Don't have an account? Sign Up
              </Link>
              </Grid>
            </Grid>
          </form>
          </div>
        </div>
        </div>
      </Container>
    )
  } else return <Redirect to='/' />
}

export default Login;
