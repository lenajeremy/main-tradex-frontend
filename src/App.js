/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import WrapperFunction from "./components/CreateAndViewPosts";
import Sidebar from "./components/SideBar";
import Store from './components/Store';
import Cart from './components/Cart';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from './fetch';
import {login, profileChange, newProduct} from './actions'
import Searchbar from './components/Searchbar'

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    let userId = localStorage.getItem('user_id');
    if(userId){
      getUser(userId, data => {
        dispatch(login(data.user));
        dispatch(profileChange(data.user.profile)); 
        dispatch(newProduct({quantity: 'batch', value: data.user.userType === 'buyer' ? data.user.cart.products : data.user.products.products}))
      });
    }
  },[])
  const userType = useSelector(state => state.userDetails.userType);
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Searchbar />
      <div className="container">
        <Route
          path="/"
          exact
          component={WrapperFunction}
        />
        <Route path={/user\/[0-9]{1,}\/profile/} component={UserProfile} />
        {userType === 'buyer' ? <Route path = {/user\/[0-9]{1,}\/cart/} component = {Cart}/> : <Route path = {/user\/[0-9]{1,}\/store/} component = {Store}/>}
        <Route path="/login" component={Login} />
        <Route path = {/view\/user-profile\/[a-z]{1,}/i} component = {UserProfile }/>
        <Route path="/register" component={Register} />
      </div>
    </div>
  );
}

export default App;
