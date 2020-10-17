// reducer for the user profile details

function profileReducer(state = {}, action ){
  switch(action.type){
    case 'updateProfile':
      return action.payload;
    default:
      return state
  }
}

export default profileReducer