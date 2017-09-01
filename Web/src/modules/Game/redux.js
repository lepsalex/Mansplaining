// import { } from '../../gameEngine'
import { emptyActionGenerator, payloadActionGenerator } from '../../helpers/redux'


/*
* Public async thunk actions
*/
export function addPlayer(dispatch, playerEmail) {
  throw new Error('Unimplemented Method')
}

export function startGame(dispatch) {
  throw new Error('Unimplemented Method')
}

export function awardPoint(dispatch, playerEmail) {
  throw new Error('Unimplemented Method')
}

export function endGame(dispatch, history) {
  throw new Error('Unimplemented Method')
}

/*
* Public State Getters
*/
export function getGameState(state) {
  return state.game
}

/*
* Game Reducer
*/
const _gameState = {}
const reducer = (state = _gameState, action) => {
  return state
}

export default reducer
