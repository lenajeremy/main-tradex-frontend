const messageReducer = (state = [], action) =>{
  switch (action.type){
    case 'newMessage':
      console.log(action)
      return state;
    case 'initialMessages':
      return action.payload;
    default:
      console.log(action);
      return state
  }
}
export default messageReducer;