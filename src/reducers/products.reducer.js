function productReducer(state = [], action ){
  switch(action.type){
    case 'removeProduct':
      let newState = [...state];
      let index = newState.findIndex(product => product.id === action.payload.id);
      index === -1 ? console.log('') : newState.splice(index, 1);
      return newState;
    case 'newProduct':
      return action.payload.quantity === 'batch' ? [...action.payload.value] : [action.payload.value, ...state];
    default:
      return state
  }
}

export default productReducer