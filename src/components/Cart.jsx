import React from 'react'
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Product from './Product';
import './styles/Product.css';
// import { editSidebar } from '../actions';
import {getStore, addToCart} from '../fetch';

function Cart(props) {
  let allproducts = useSelector(state => state.userDetails.cart);
  let userId = useSelector(state => state.userDetails.id);
  // const dispatch = useDispatch();

  const [products, setProducts] = React.useState(['hello']);
  const [toRedirect, setRedirect ] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem('user_id')){
      props.self ? setProducts(allproducts.products) : getStore(props.routeProps.match.params.userName, data => setProducts(data.products));
    }else setRedirect(true);
  },[]);

  const manageCart = (product_details, operation) =>{
    if(operation === 'add to cart'){
      addToCart(product_details.id, userId, data => {
        console.log(data)
      })
    }
  }
  
  if(!toRedirect){
    return (
      <div className = 'cart'>
        <h4 className = 'my-4 text-center'>{props.self ? 'Your' : props.routeProps.match.params.userName + '\'s'} {props.self ? 'Cart' : 'Store'}</h4>
        <div className = 'productsGrid'>
        {products.map((product, index) => <Product key = {index} productDetails ={product} view = 'cart' self = {props.self} manage = {(values, operation) => manageCart(values, operation)}/>)}
        </div>
      </div>
    )
  } return <Redirect to = '/login'/>
}
  

export default Cart
