import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegistReducer } from "./Reducers/userReducer";
import {
  createNotesReducer,
  deleteNotesReducer,
  noteListReducer,
  updateNotesReducer,
} from "./Reducers/noteReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegistReducer,
  noteList: noteListReducer,
  createNote: createNotesReducer,
  updateNote: updateNotesReducer,
  deleteNote: deleteNotesReducer,
});

const userInfoLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoLocal },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
