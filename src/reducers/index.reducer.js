import { combineReducers } from "redux";
import profileReducer from "./profile.reducer";
import userReducer from './user.reducer';
import sideBarReducer from './sidebar.reducer';
import productReducer from './products.reducer';
import postReducer from './posts.reducer';

const rootReducer = combineReducers({
  posts: postReducer,
  userProfile: profileReducer,
  userDetails: userReducer,
  sideBar: sideBarReducer,
  products: productReducer,
});

export default rootReducer;
