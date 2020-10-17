// reducer for the user and the user details

function userReducer(state = {}, action){
  switch(action.type){
    case 'login':
      return action.payload
    default:
      return state
  }
}

export default userReducer