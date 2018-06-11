import { combineReducers } from 'redux'
import { default as session } from  './session'
import { default as search } from  './search'

const rootReducer = combineReducers({
  session,
  search
})

export default rootReducer
