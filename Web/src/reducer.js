import { combineReducers } from 'redux'

import { reducer as gameManager } from './modules/Home'
import { reducer as game } from './modules/Game'

const reducer = combineReducers({
  gameManager,
  game
})

export default reducer
