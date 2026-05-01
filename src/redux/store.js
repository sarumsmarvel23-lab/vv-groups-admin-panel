// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./rootReducer";
// const middleware = [thunk];

// const initialState = {};
// let store;
// if (
//   process.env.REACT_APP_MODE === "staging" ||
//   process.env.REACT_APP_MODE === "development" ||
//   process.env.REACT_APP_MODE === "production"
// ) {
//   store = createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//   );
// } else {
//   store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(...middleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }
// // const store = createStore(changeState)
// export default store;
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [thunk];
const initialState = {};

// safely use Redux DevTools if available
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
