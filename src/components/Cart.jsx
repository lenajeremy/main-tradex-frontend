import React from 'react'
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Product from './Product';
import './styles/Product.css';
import {getStore, cartOperation} from '../fetch';
import {newProduct, removeProductAction} from '../actions';
import Fab from '@material-ui/core/Fab';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';


function Cart(props) {
  let allproducts = useSelector(state => state.products);
  let userId = useSelector(state => state.userDetails.id);
  const dispatch = useDispatch();

  const [products, setProducts] = React.useState(['hello']);
  const [toRedirect, setRedirect ] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem('user_id')){
      props.self ? setProducts(allproducts) : getStore(props.routeProps.match.params.userName, data => setProducts(data.products));
    }else setRedirect(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const manageCart = (product_details, operation) =>{
    alert('the cart has been alerted');
    cartOperation(product_details.id, userId, operation, data => {
      data.status === 200 ? operation === 'add to cart' ? dispatch(newProduct({quantity: 'single', value: data.details})) : dispatch(removeProductAction(data.details)): console.log('')
    })
    // if(operation === 'add to cart'){
    //   cartOperations(product_details.id, userId, operation, data => {
    //     data.status === 200 ? dispatch(newProduct({quantity: 'single', value: data.details})) : console.log('')
    //   })
    // }else if(operation === 'remove_from_cart'){
    //   cartOperations(product_details.id, userId, operation, data => {
    //     data.status === 200 ? dispatch(newProduct({quantity: 'single', value: data.details})) : console.log('')
    //   })
    // }
  }
  
  if(!toRedirect){
    return (
      <div className = 'cart'>
        <h4 className = 'my-4 text-center'>{props.self ? 'Your' : props.routeProps.match.params.userName + '\'s'} {props.self ? 'Cart' : 'Store'}</h4>
        <div className = 'productsGrid'>
        {products.map((product, index) => <Product key = {index} productDetails ={product} view = 'cart' self = {props.self} manage = {(values, operation) => manageCart(values, operation)}/>)}
        </div>
        {props.self && <Fab color = 'secondary' variant = 'contained'><LocalGroceryStore/></Fab>}
      </div>
    )
  } return <Redirect to = '/login'/>
}
  

export default Cart
