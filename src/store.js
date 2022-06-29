import { applyMiddleware, createStore, compose } from 'redux'
import allReducers from 'src/reducers'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

// const initialState = {
//   sidebarShow: "responsive",
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case "set":
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

// const store = createStore(changeState);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  allReducers,
  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor }
