import React from 'react'
import {Redirect, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Product from './Product';
import {ArrowBackIos, ShoppingCart} from '@material-ui/icons';
import './styles/Product.css';
import {getStore, cartOperation} from '../fetch';
import {newProduct, removeProductAction} from '../actions';
import Fab from '@material-ui/core/Fab';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import {Link} from 'react-router-dom';
import emptyStoreImage from '../empty.svg';


function Cart(props) {
  let allproducts = useSelector(state => state.products);
  let userId = useSelector(state => state.userDetails.id);
  const dispatch = useDispatch();

  const [products, setProducts] = React.useState(['hello']);
  const [toRedirect, setRedirect ] = React.useState(false);
  const [name, setName]  = React.useState('Anonymous');
  const history = useHistory();

  React.useEffect(() => {
    if(localStorage.getItem('user_id')){
      props.self ? setProducts(allproducts) : getStore(props.routeProps.match.params.userName, data => {setProducts(data.products); setName(data.owner)});
    }else setRedirect(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => setProducts(props.self ? allproducts : products),[allproducts, products, props.self]);

  const manageCart = (product_details, operation) => cartOperation(product_details.id, userId, operation, data => data.status === 200 ? operation === 'add_to_cart' ? dispatch(newProduct({quantity: 'single', value: data.details})) : dispatch(removeProductAction(data.details)): console.log(''))
  
  if(!toRedirect){
    return (
      <div className = 'cart container'>
        <div className="top d-flex align-items-center">
          <div className = 'd-flex align-items-center' onClick = {() => history.goBack()}>
            <ArrowBackIos />
            <p>{props.self ? 'Your' : name + '\'s'} {props.self ? 'Cart' : 'Store'}</p>
          </div>
          <ShoppingCart/>
        </div>
        <div className = 'productsGrid' style = {products.length === 0 ? {flexDirection: 'column'} : null}>
        {products.length === 0 ? 
        <React.Fragment>
            <img className = 'no-product-image' src = {emptyStoreImage} alt = {emptyStoreImage} />
            <h5>{props.self ? "You have not add any product to your cart" : "No Product Found in Store"}</h5>
        </React.Fragment> : products.map((product, index) => <Product key = {index} index ={index} productDetails ={product} view = 'cart' self = {props.self} manage = {(values, operation) => manageCart(values, operation)}/>)}
        </div>
        <div className = 'floating-action-button' initial = {{rotate: '-45deg', bottom: '30px', scale: 0, opacity: 0}} animate ={{ bottom: '70px', rotate: '0deg', scale: 1, opacity: 1}}>{props.self && <Link to = '/review-cart/' disabled = {products.length === 0}><Fab disabled = {products.length === 0} color = 'secondary' variant = 'extended'><LocalGroceryStore/>Pay</Fab></Link>}</div>
      </div>
    )
  } return <Redirect to = '/login'/>
}  

export default Cart
