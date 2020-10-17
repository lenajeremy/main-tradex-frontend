const sideBarReducer = (state= 'explore', action ) => {
  switch(action.type){
    case 'editSidebar':
      return action.payload.value
    default:
      return state
  }
};
export default sideBarReducer