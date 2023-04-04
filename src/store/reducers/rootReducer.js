import { combineReducers } from "redux";

import spotifyReducer from "./spotify";
import myListReducer from "./myList";
import playerReducer from "./player";
import searchReducer from "./searchList";

export default combineReducers({
  spotify: spotifyReducer,
  myList: myListReducer,
  player: playerReducer,
  search: searchReducer,
});
