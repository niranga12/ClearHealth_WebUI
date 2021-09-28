import loginReducer  from './loginReducer';
import changeState from './changeReducer'


//third party npm for popup 
import {reducer as notificationsReducer} from 'reapop'


import {combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import loaderReducer from './loaderReducer';
import pricingReducer from './pricingReducer';
import orderReducer from './orderReducer';
import orderTableReducer from './orderTableReducer';
import permissionReducer from './permissionReducer';


const persistConfig={
   key:'root',
   storage,
   whitelist:['Login','Permission']
}

const rootReducer= combineReducers({
   Login: loginReducer,
   sidebar: changeState,
   Loader:loaderReducer,
   Pricing:pricingReducer,
   Order:orderReducer,
   mainOrder:orderTableReducer,
   Permission:permissionReducer,
   notifications: notificationsReducer(),

})


// const allReducers= combineReducers({
//    Login: loginReducer,
//    sidebar: changeState,
//    notifications: notificationsReducer(),

// })

const allReducers =persistReducer(persistConfig,rootReducer)

export default allReducers;