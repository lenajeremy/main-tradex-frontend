import React from 'react';
import {useSelector} from 'react-redux';

export default function Checkout() {
  const products = useSelector(store => store.products);
  const calculateTotal = (products) => products.length === 0 ? 0 : products.length === 1 ? products[0].price * products[0].currentStock : products.reduce((a, b) => typeof a === 'object' ? a.price * a.currentStock + b.price * b.currentStock : a + b.price * b.currentStock);
  const [total, setTotal]= React.useState(calculateTotal(products));
  
  React.useEffect(() => setTotal(calculateTotal(products)),[products])
  
  return (
    <div className = 'checkout'>
      <p className="price">{total}</p>
      {products.map((product, key) => <ProductLittle key = {key} productDetails = {product}/>)}
    </div>
  )
}


function ProductLittle({productDetails}){
  return null;
}
