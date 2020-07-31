import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import auths from './auth'
import alerts from './alert'
export default combineReducers({
 booking: bookingReducer,
 auth: auths ,
 alert: alerts
});