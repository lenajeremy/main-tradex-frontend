const messageReducer = (state = [], action) =>{
  switch (action.type){
    case 'newMessage':
      let newState = [];
      let index = state.findIndex(message => message.conversation_id === action.payload.conversation_id);
      if (index !== -1){
        state.forEach((message, i) => i === index ? console.log('hello') : newState.push(message));
      }
      newState.unshift(action.payload);
      return newState;
    case 'initialMessages':
      return action.payload;
    default:
      console.log(action);
      return state
  }
}
export default messageReducer;