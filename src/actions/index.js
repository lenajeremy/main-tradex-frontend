function fetchposts(data) {
  return {
    type: "new",
    payload: data,
  };
}
const likepost = (id, presentCount, isLiked) => {
  return { type: "like", payload: { id, presentCount, isLiked } };
};

const login = (details) => {
  return { type: "login", payload: details };
};

const profileChange = (newProfileDetails) => {
  return { type: "updateProfile", payload: newProfileDetails };
};

const createPost = post => {
  return { type: 'created', payload: post }
}

const editSidebar = active => {
  return { type: 'editSidebar', payload: active }
}
const removeProductAction = product => {
  return { type: 'removeProduct', payload: product }
}
const newProduct = product => {
  return { type: 'newProduct', payload: { quantity: product.quantity, value: product.value } }
}

const editPictures = details => {
  return { type: 'editPictures', payload: details }
}
const addToCart = product_details => {
  return { type: 'addToCart', payload: product_details }
}

const editProduct = ({ id, currentStock }) => {
  return { type: 'editProduct', payload: { id, currentStock } }
}
const newMessage = messageDetails => {
  return { type: 'newMessage', payload: messageDetails };
}
const initialMessages = messages => {
  return { type: 'initialMessages', payload: messages }
}
const editSidebarVisibility = visible => {
  return {type: 'editSidebarVisibility', payload: visible}
}
export { likepost, fetchposts, login, profileChange, createPost, editSidebar, removeProductAction, newProduct, editPictures, addToCart, editProduct, initialMessages, newMessage, editSidebarVisibility};
