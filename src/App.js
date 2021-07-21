/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProductDetails from "./components/ProductDetails";
import Messages from "./components/Messages";
import ChatArea from './components/ChatArea';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Switch } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import WrapperFunction from "./components/CreateAndViewPosts";
import Sidebar from "./components/SideBar";
import Store from "./components/Store";
import Notifications from "./components/Notifications";
import Cart from "./components/Cart";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./fetch";
import { login, profileChange, newProduct, initialMessages } from "./actions";
import Checkout from "./components/Checkout";
import MainCheckout from "./components/MainCheckout";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

function App(props) {
  const dispatch = useDispatch();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#42b685',
        light: '#efefef',
        dark: '#333333'

      },
      secondary: {
        main: '#efefef'
      }
    }
  })

  React.useEffect(() => {

    // get the user id from localStorage, 
    // then make a request to the backend
    // and then update the frontend with the data from the backend
    let userId = localStorage.getItem("user_id");
    if (userId) {
      getUser(userId, true, data => {
        if (data.status === 200) {
          dispatch(login(data.user));
          dispatch(profileChange(data.user.profile));
          dispatch(initialMessages(data.user.latestMessages));
          dispatch(
            newProduct({
              quantity: "batch",
              value:
                data.user.userType === "buyer"
                  ? data.user.cart.products
                  : data.user.products.products,
            })
          );
        }
      });
    }
  }, []);


  const user = useSelector((state) => state.userDetails);
  const sideBarVisible = useSelector(state => state.sideBarVisible);

  return (
    <ThemeProvider theme = {theme}>
    <div className="App">
      <Header />
      <Sidebar visible = {sideBarVisible}/>
      <Route path="/" exact component={WrapperFunction} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/user/:userId/profile"
        component={props => <UserProfile self={true} routeProps={props} />}
      />
      <Switch>
        {user.userType === "buyer" ? (
          <Route
            path="/user/:userId/cart"
            component={() => <Cart self={true} />}
          />
        ) : (
          <Route
            path="/user/:userId/store"
            component={() => <Store self={true} />}
          />
        )}
        <Route
          path="/view/user-profile/:userId"
          component={(props) => (
            <UserProfile self={false} routeProps={props} />
          )}
        />
      </Switch>
      <Route
        path="/view/user/store/:userName"
        component={(props) => <Cart routeProps={props} self={false} />}
      />
      <Route path="/review-cart" component={Checkout} />
      <Route path="/checkout" component={MainCheckout} />
      <Route path="/product/:productId" component={ProductDetails} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/messages" component={Messages} />
      <Route path = '/chat/:chatId' component = {props => <ChatArea routeProps = {props} user_id = {user.id}/>}/>
    </div>
    </ThemeProvider>
  );
}

export default App
