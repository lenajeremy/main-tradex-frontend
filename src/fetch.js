// const backendAPI = 'https://tradesocial.herokuapp.com';
const backendAPI = 'http://localhost:8000'
function getUser(user_id, callback){
  fetch(`${backendAPI}/users/${user_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getPost(post_id, callback){
  fetch(`${backendAPI}/post/${post_id}`)
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getAllPosts(user, start, callback){
  fetch(`${backendAPI}/posts/all?start=${start}&end=${start+4}&user=${user}`)
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function getStore(store_owner, callback){
  fetch(`${backendAPI}/store?owner_username=${store_owner}`)
  .then(data => data.json())
  .then(data => callback(data))
  .catch(error => console.error(error.message));
}

function cartOperation(product_id, user_id, operation, callback){
  fetch(`${backendAPI}/cart/add`, {
    method: "POST",
    body: JSON.stringify({
      product_id,
      user_id,
      operation,
      quantity: 1
    })
  }).then(data => data.json())
  .then(data => callback(data))
  .catch(er => console.log(er))
}
function getProduct(productId, callback){
  fetch(`${backendAPI}/product?id=${productId}`)
  .then(data => data.json())
  .then(data => {
    console.log(data);
    callback(data)})
  .catch(error => console.log(error))
}

function loginUser(username, password, callback){
  fetch(`${backendAPI}/accounts/login/`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function registerUser(username, firstname, lastname, userType, password, email, paypalEmail,  conf_password, callback){
  fetch(`${backendAPI}/accounts/register/`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      first_name: firstname,
      last_name: lastname, 
      email: email,
      paypalEmail: paypalEmail,
      user_type: userType,
      password: password,
      conf_password: conf_password
    })
  })
  .then(data=> data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function createNewPost(user_id, postContent, image, callback){
  let formData = new FormData();
  formData.append('user_id', user_id)
  formData.append('content', postContent)
  formData.append('imageUrl', image, image.name);
  fetch(`${backendAPI}/posts/new`, {
    method: "POST",
    body: formData
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function createNewProduct(user_id, name, description, availableQuantity, price, imageUrl, callback){
  let formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('name', name)
  formData.append('price', price);
  formData.append('availableQuantity', availableQuantity);
  formData.append('description', description);
  formData.append('imageUrl', imageUrl, imageUrl.name);
  fetch(`${backendAPI}/product/new`, {
    method: "POST",
    body: formData
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}

function editPost(user_id, post_id, operation, newText, callback){
  fetch(`${backendAPI}/post/${post_id}/${operation}`,{
    method: "PUT", 
    body: JSON.stringify(
      {
        user_id: user_id,
        newText: newText,
        operation: operation,
        post_id: post_id
    })
  })
  .then(data => data.json())
  .then(data => callback(data))
  .catch(err => console.log(err))
}
function editUser(user_id, details, callback){
  let formData = new FormData();
  if(details.field === 'profilePicture'){
    formData.append('field', 'profile_image');
    formData.append('profile_image', details.value.image, details.value.imageName);
  }else if(details.field === 'coverPicture'){
    formData.append('field', 'cover_image');
    formData.append('cover_image', details.value.image, details.value.imageName);
  } else{
    formData.append('field', 'lorem');
    formData.append('status', details.status);
    formData.append('bio', details.bio);
  }
  fetch(`${backendAPI}/user/${user_id}/edit`, {
    method: "POST",
    body: formData
  }).then(data => data.json())
  .then(data => callback(data))
  .catch(error => console.log(error));
}
function removeProduct(user_id, product_id, callback){
  fetch(`${backendAPI}/product/${product_id}/remove?user_id=${user_id}`)
  .then(data => data.json())
  .then(data => callback(data))
}

function getChatMessages(user_id, chat_id, step, callback){
  fetch(`${backendAPI}/messages?operation=get_chat_messages&step=${step}&chat_id=${chat_id}&ref_id=${user_id}`)
  .then(data => data.json())
  .then(data => callback(data))
}
module.exports = {
  getUser,
  getPost, 
  getAllPosts,
  removeProduct,
  getProduct,
  loginUser, 
  registerUser, 
  createNewPost, 
  createNewProduct, 
  editPost,
  editUser,
  backendAPI,
  getStore,
  cartOperation,
  getChatMessages
}