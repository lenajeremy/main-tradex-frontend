function fetchposts(data) {
  return {
    type: "new",
    payload: data,
  };
}
const likepost = (id, presentCount, isLiked) => {
  return { type: "like", payload: {id, presentCount, isLiked}};
};

const login = (details) => {
  return { type: "login", payload: details };
};

const profileChange = (newProfileDetails) => {
  return { type: "updateProfile", payload: newProfileDetails };
};

const createPost =post =>{
  return {type: 'created', payload: post}
}

const editSidebar = active => {
  return {type : 'editSidebar', payload:active}
}
const removeProductAction = product => {
  return {type: 'removeProduct', payload:product}
}
const newProduct = product =>{
  return {type :'newProduct', payload:{quantity: product.quantity, value: product.value}}
}

const editPictures = details => {
  return {type: 'editPictures', payload: details}
}
export { likepost, fetchposts, login, profileChange, createPost, editSidebar, removeProductAction, newProduct, editPictures};
