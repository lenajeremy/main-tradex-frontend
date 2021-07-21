import React, { useState } from 'react';
import { registerUser, getUser } from '../fetch';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Lock} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {login, profileChange, newProduct} from '../actions'
import {Redirect, Link} from 'react-router-dom';
import backgroundImage from '../assets/tradex.jpg';
import './styles/Login.css';



function Register(props) {

  const dispatch = useDispatch();
  // useful states
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [paypal, setPaypal] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConfPassword] = useState('');
  const [userType, setUserType] = useState(null);
  const [isError, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const [toRedirect, setRedirect] = useState(false);

  function resetState() {
    setError(false);
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPaypal('');
    setPassword('');
    setConfPassword('');
    setError('');
    setErrors([]);
  }
  function handleFormSubmission(event) {
    setClicked(true);
    event.preventDefault();
    if((username && first_name && last_name && userType && password && email && paypal && conf_password && password === conf_password )){
      registerUser(username, first_name, last_name, userType, password, email, paypal, conf_password, data => {
        if (data.status === 200) {
          getUser(data.id,true, userDetails => {
            console.log(userDetails)
            dispatch(login(userDetails.user))
            dispatch(profileChange(userDetails.user.profile));
            userDetails.user.userType === 'buyer' ? dispatch(newProduct({quantity: 'batch', value: userDetails.user.cart.products})) : dispatch(newProduct({quantity: 'batch', value: userDetails.user.products.products}));
            setError(false);
            localStorage.setItem('user_id', userDetails.user.id);
            setRedirect(true);
          })
          resetState()
        } else { setError(true); setErrors(data.errors) }
        setClicked(false)
      })
    } else if(password !== conf_password) {setError(true); setErrors([...errors, 'Passwords do not match'])}
    else {setError(true); setErrors([...errors, 'Please fill the required fields']);}
  }
    if(toRedirect){
      return <Redirect to = '/'/>
    }
    else return(

    <Container component = 'main' maxWidth = 'xl' style = {{padding : 0}}>
      <div className = 'registration login-row row'>
        <div className = 'col-md-6 login-left' style ={{background: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
          <p>Sign up to get started</p>
        </div>
        <div className = 'col-md-6 d-flex align-items-center'>
          <div className = 'w-75 mx-auto'>
            <Typography component='h1' variant = 'h4' className = 'text-center justify-content-center mb-4 d-flex align-items-center color-primary'><Lock className = 'mr-3' style ={{width: '1.5em', height: '1.5em'}}/>Create an Account</Typography>
            {isError ? errors.map((error, key) => <p className = 'text-center text-danger' key = {{key}}>{error}</p>) : ''}
            <form className = 'register__form' onSubmit = {handleFormSubmission}>
          <Grid container spacing = {2}>
            <Grid item sm = {6}>
              <TextField
                name = 'first_name'
                variant = 'filled'
                label = 'First Name'
                required
                fullWidth
                autoFocus
                onChange = {event=> setFirstName(event.target.value)}
                value = {first_name}
              />
            </Grid>
            <Grid item sm = {6}>
              <TextField 
                name = 'last_name'
                value = {last_name}
                variant = 'filled'
                required
                fullWidth
                label = 'Last Name'
                onChange = {event=> setLastName(event.target.value)}
             />
            </Grid>
            <Grid item sm = {12}>
              <TextField
                name = 'username'
                variant = 'filled'
                value = {username}
                required
                fullWidth
                onChange = {event=> setUsername(event.target.value)}
                label = 'Choose your username'
              />
            </Grid>
            <Grid item sm = {6}>
              <TextField
                name = 'email'
                variant = 'filled'
                value = {email}
                required
                fullWidth
                type = 'email'
                onChange = {event=> setEmail(event.target.value)}
                label = 'Email Address'
              />
            </Grid>
            <Grid item sm = {6}>
              <TextField
                name = 'paypal_email_address'
                variant = 'filled'
                value = {paypal}
                fullWidth
                type = 'email'
                onChange = {event=> setPaypal(event.target.value)}
                label = 'Paypal Email Address'
              />
            </Grid>
            <Grid item sm = {12}>
              <TextField
                name = 'password'
                variant = 'filled'
                value = {password}
                required
                onChange = {event=> setPassword(event.target.value)}
                fullWidth
                type = 'password'
                label = 'Password'
              />
            </Grid>
            <Grid item sm = {12}>
              <TextField
                name = 'conf_password'
                variant = 'filled'
                value = {conf_password}
                required
                onChange = {event=> setConfPassword(event.target.value)}
                fullWidth
                type = 'password'
                label = 'Enter password again'
              />
            </Grid>
            <Grid item sm = {6} className = 'd-flex justify-content-center'>
              <FormControlLabel control= {<Radio value = 'buyer'checked = {userType === 'buyer'} inputProps = {{name: 'userType'}} color= 'primary' onChange = {event=> setUserType(event.target.value)}/>}
                label = 'Register as a buyer'
              />
            </Grid>
            <Grid item sm = {6} className = 'd-flex justify-content-center'>
              <FormControlLabel control = {<Radio value = 'seller' checked = {userType === 'seller'} inputProps = {{name: 'userType'}} color= 'primary' onChange = {event=> setUserType(event.target.value)}/>}
                label = 'Register as a seller'
              />
            </Grid>
          </Grid>
          <Button
          style = {isClicked ? {pointerEvents: 'none'} : {pointerEvents: 'all'}}
            type="submit"
            fullWidth
            variant="contained"
            color = 'primary'
          >{isClicked ? <React.Fragment>Creating your account...<CircularProgress id = 'reg_loader' color = 'primary' variant = 'indeterminate'/></React.Fragment> : 'Sign Up'}</Button>
          <Grid container className = 'text-center'>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
          </div>
        </div>
      </div>
    </Container>
    )
}

export default Register
