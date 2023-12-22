import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import playlistReducer from "./playlist";
import sessionReducer from "./session";
import albumsReducer from "./album";
import likesReducer from "./likes";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  session: sessionReducer,
  albums: albumsReducer,
  playlists: playlistReducer,
  likes: likesReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
