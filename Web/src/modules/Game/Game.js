// @flow
import React from 'react'
import { number, string, bool, func, array, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { addPlayer, startGame, awardPoint, endGame, getGameState } from './redux'

export const Game = (props: Object) => {
  const styles = require('./Game.scss')

  const { history } = props
  
  return (
    <main className={ styles.homeMain }>
      <Helmet title="Mansplaining the Game!!!" />
      NEW GAME
    </main>
  )
}

Game.displayName = 'Game'

Game.propTypes = {
  game: shape({
    loading: bool.isRequired,
    players: array.isRequired,
    scores: array.isRequired,
    pointsRemaining: number.isRequired,
    error: string
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired
}

Game.fetchData = ({ dispatch }, { params }) => console.log(params.address);

const mapStateToProps = state => ({
  game: getGameState(state)
})

const mapDispatchToProps = dispatch => ({
  addPlayer: playerEmail => addPlayer(dispatch, playerEmail),
  startGame: () => startGame(),
  awardPoint: playerEmail => awardPoint(dispatch, playerEmail),
  endGame: history => endGame(dispatch, history)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game))
