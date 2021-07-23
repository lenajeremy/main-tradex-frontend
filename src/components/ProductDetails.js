import React from 'react';
import { useHistory } from 'react-router-dom';
import { getProduct } from '../fetch';
import { ArrowBackIos, ThumbUpAlt } from '@material-ui/icons';
import { Button, Typography } from '@material-ui/core';
import useUrl from '../hooks/useProfileUrl';

function ProductDetails(props) {
  const url = useUrl();
  const history = useHistory();
  const [productDetails, setProductDetails] = React.useState({ name: 'Loading' });

  //eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    async function getProductDetails() {
      await getProduct(props.match.params.productId, data => data.status === 200 ? setProductDetails(data.details) : setProductDetails(productDetails));
    }
    getProductDetails();
  }, []);

  return (
    <div className='product_details container'>
      <div className='top'>
        <div className='d-flex align-items-center' onClick={() => history.goBack()}>
          <ArrowBackIos />
          <p>Back</p>
        </div>
      </div>
      <div className='product_main'>
        <div className='product_image'>
          <ThumbUpAlt className='like_product' />
          <img src={url(productDetails.image)} alt={productDetails.description} className='img-fluid img-responsive img-rounded' />
          <div className='px-md-4 product_title align-items-center mt-4 mb-2 d-flex justify-content-between'>
            <Typography className='w-75 font-weight-bold' component='h5' variant='h5'>{productDetails.name}</Typography>
            <Button variant='contained' color='primary'>N{productDetails.price}</Button>
          </div>
        </div>
        <div className='product_desc'>
          <h3>Description</h3>
          <p className='lead'>{productDetails.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
