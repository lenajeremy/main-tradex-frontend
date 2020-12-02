const messageReducer = (state = [], action) =>{
  switch (action.type){
    case 'new_message':
      return state;
    case 'lastestMessages':
      return state;
    default:
      return state
  }
}
export default messageReducer;