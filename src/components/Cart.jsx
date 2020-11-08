import React from 'react'
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Product from './Product';
import './styles/Product.css';
import {getStore, cartOperation} from '../fetch';
import {newProduct, removeProductAction} from '../actions';
import Fab from '@material-ui/core/Fab';
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';


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

  // eslist-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => setProducts(props.self ? allproducts : products),[allproducts, products, props.self]);

  const manageCart = (product_details, operation) =>
    cartOperation(product_details.id, userId, operation, data => {
      data.status === 200 ? operation === 'add_to_cart' ? dispatch(newProduct({quantity: 'single', value: data.details})) : dispatch(removeProductAction(data.details)): console.log('')
    })
  
  
  if(!toRedirect){
    return (
      <div className = 'cart'>
        <h4 className = 'my-4 text-center'>{props.self ? 'Your' : props.routeProps.match.params.userName + '\'s'} {props.self ? 'Cart' : 'Store'}</h4>
        <div className = 'productsGrid'>
        {products.map((product, index) => <Product key = {index} index ={index} productDetails ={product} view = 'cart' self = {props.self} manage = {(values, operation) => manageCart(values, operation)}/>)}
        </div>
        <motion.div className = 'floating-action-button' initial = {{rotate: '-45deg', bottom: '30px', scale: 0, opacity: 0}} animate ={{ bottom: '70px', rotate: '0deg', scale: 1, opacity: 1}}>{props.self && <Link to = '/checkout/'><Fab disabled = {products.length === 0} color = 'secondary' variant = 'extended'><LocalGroceryStore/>Pay</Fab></Link>}</motion.div>
      </div>
    )
  } return <Redirect to = '/login'/>
}  

export default Cart
