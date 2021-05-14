import loginReducer  from './loginReducer';
import changeState from './changeReducer'

//third party npm for popup 
import {reducer as notificationsReducer} from 'reapop'


import {combineReducers } from 'redux'



const allReducers= combineReducers({
   Login: loginReducer,
   sidebar: changeState,
   notifications: notificationsReducer(),

})

export default allReducers;