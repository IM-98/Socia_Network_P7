import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postsReducer from './posts.reducers'


export default combineReducers({
    userReducer,
    usersReducer,
    postsReducer
})