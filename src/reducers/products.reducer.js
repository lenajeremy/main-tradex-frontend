function productReducer(state = [], action ){
  switch(action.type){
    case 'removeProduct':
      let index = state.indexOf(action.payload);
      let newState = [...state];
      index === -1 ? console.log('') : newState.splice(index, 1);
      return newState;
    case 'newProduct':
      return action.payload.quantity === 'batch' ? [...action.payload.value, ...state] : [action.payload.value, ...state];
    default:
      return state
  }
}

export default productReducer