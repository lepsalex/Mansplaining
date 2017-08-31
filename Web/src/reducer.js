import { combineReducers } from 'redux'

import { reducer as game } from './modules/Home'

const reducer = combineReducers({
  game
})

export default reducer
