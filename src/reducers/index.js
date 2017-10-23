import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import story from './story'
import session from './session'

export default combineReducers({
  routing: routerReducer,
  session,
  story
})