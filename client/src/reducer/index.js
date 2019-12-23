import { combineReducers } from 'redux'
import MusicReducer from './MusicReducer'
import AuthReducer from './AuthReducer'
import AlertReducer from './AlertReducer'

export default combineReducers({music: MusicReducer, auth: AuthReducer, alert: AlertReducer})