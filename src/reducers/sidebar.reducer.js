const sideBarReducer = (state= 'explore', action ) => {
  switch(action.type){
    case 'editSidebar':
      return action.payload.value
    default:
      return state
  }
};

const sideBarVisible = (state = true, action) => {
  switch (action.type) {
    case 'editSidebarVisibility':
      return action.payload;
    default:
      return state;
  }
}

export { sideBarReducer, sideBarVisible };