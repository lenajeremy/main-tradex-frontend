import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {LockOutlined} from '@material-ui/icons';
import{TextField, Typography, Container, FormControlLabel, Button, Checkbox, CircularProgress, Grid} from '@material-ui/core';
import { loginUser, getUser } from '../fetch';
import { login, profileChange, newProduct } from '../actions';
import { Redirect, Link } from 'react-router-dom';
import './styles/Login.css';

function Login(props) {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [toRedirect, setRedirect] = useState(false);
  const [submit, setSubmit ] = useState(false);

  function handleFormSubmission(event) {
    setSubmit(true);
    event.preventDefault();
    loginUser(userName, password, data => {
      if (data.status === 200) {
        getUser(data.id, userDetails => {
          console.log(userDetails);
          dispatch(login(userDetails.user));
          dispatch(profileChange(userDetails.user.profile));
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
      <Container component='main' maxWidth='xs'>
        <div className="login">
          <Typography component='h1' variant = 'h5' className = 'text-center my-3'><LockOutlined />Log in</Typography>
          {error ? <p className = 'text-danger text-center my-2'>Invalid Login Credentials</p> : ''}
          <form onSubmit={handleFormSubmission} className='login__form'>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <TextField
                  name='username'
                  variant='outlined'
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
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  label='Password'
                  type='password'
                  onChange={event => setPassword(event.currentTarget.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Remember Me"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color='primary'>{submit ? <React.Fragment>Logging you in...<CircularProgress variant = 'indeterminate' color = 'primary' id = 'login__loader'/></React.Fragment> : 'Log in'}</Button>
            <Grid container spacing={2} className = 'text-center mt-1'>
              <Grid item>
                <Link to='/register'>
                  Don't have an account? Sign Up
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  } else return <Redirect to='/' />
}

export default Login;