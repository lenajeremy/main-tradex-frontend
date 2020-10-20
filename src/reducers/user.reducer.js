// reducer for the user and the user details

function userReducer(state = {}, action){
  switch(action.type){
    case 'login':
      return action.payload
    case 'editPictures':
      let newState = {...state};
      newState[action.payload.name] = action.payload.value
      return newState
    default:
      return state
  }
}

export default userReducer
