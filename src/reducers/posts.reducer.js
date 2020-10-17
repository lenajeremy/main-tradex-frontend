function postReducer(state = [], action) {
  switch (action.type) {
    case "new":
      return [...state, ...action.payload];
    case "like":
      const postToLike = state.find((post) => (post.id = action.payload.id));
      postToLike.number_of_likes = action.payload.presentCount;
      return state;
    case "created":
      return [action.payload, ...state];
    default:
      return state;
  }
}
export default postReducer;
