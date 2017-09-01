import { createNewGameContract } from '../../gameEngine'
import { emptyActionGenerator, payloadActionGenerator } from '../../helpers/redux'

const NEW_GAME_REQUEST = 'home/NEW_GAME_REQUEST'
const NEW_GAME_SUCCESS = 'home/NEW_GAME_SUCCESS'
const NEW_GAME_FAILURE = 'home/NEW_GAME_FAILURE'

const gameAsyncStart = emptyActionGenerator(NEW_GAME_REQUEST)
const gameAsyncSuccess = payloadActionGenerator(NEW_GAME_SUCCESS)
const gameAsyncError = payloadActionGenerator(NEW_GAME_FAILURE)


/*
* Public async thunk actions
*/
export function newGame(dispatch, history) {
  
  dispatch(gameAsyncStart())

  // Start a new game by creating the new game contract and then going to the appropriate page
  return createNewGameContract()
    .then(response => {
      dispatch(gameAsyncSuccess(response))
      history.push(`/game/${response}`)
    })
    .catch(error => {
      console.log(error)
      dispatch(gameAsyncError("Error"))
    })
}

/*
* Public State Getters
*/
export function getGameManagerState(state) {
  return state.gameManager
}

/*
* Game Reducer
*/
const _gameManagerState = {
  loading: false,
  gameAddress: '',
  error: null
}
const reducer = (state = _gameManagerState, action) => {

  switch (action.type) {

    case NEW_GAME_REQUEST:
      return {
        ...state,
        loading: true
      }
    case NEW_GAME_SUCCESS:
      return {
        ...state,
        gameAddress: action.payload,
        loading: false
      }
    case NEW_GAME_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
  }

  return state
}

export default reducer
