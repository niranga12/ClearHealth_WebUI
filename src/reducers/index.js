import loginReducer  from './loginReducer';
import changeState from './changeReducer'


//third party npm for popup 
import {reducer as notificationsReducer} from 'reapop'


import {combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import loaderReducer from './loaderReducer';


const persistConfig={
   key:'root',
   storage,
   whitelist:['Login']
}

const rootReducer= combineReducers({
   Login: loginReducer,
   sidebar: changeState,
   Loader:loaderReducer,
   notifications: notificationsReducer(),

})


// const allReducers= combineReducers({
//    Login: loginReducer,
//    sidebar: changeState,
//    notifications: notificationsReducer(),

// })

const allReducers =persistReducer(persistConfig,rootReducer)

export default allReducers;