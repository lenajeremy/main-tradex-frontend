function postReducer(state = [], action) {
  switch (action.type) {
    case "new":
      return [...state, ...action.payload];
    case "like":
      let postToLike = state.find((post) => (post.id = action.payload.id));
      postToLike = {...postToLike, number_of_likes: action.payload.presentCount, isLiked: action.payload.isLiked}
      return state;
    case "created":
      return [action.payload, ...state];
    default:
      return state;
  }
}
export default postReducer;
