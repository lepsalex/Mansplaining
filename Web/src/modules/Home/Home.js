// @flow
import React from 'react'
import { string, bool, func, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { newGame, getGameManagerState } from './redux'

export const Home = (props: Object) => {
  const styles = require('./Home.scss')

  const { startNewGame, history } = props

  const onNewGameClick = () => startNewGame(history)

  return (
    <main className={ styles.homeMain }>
      <Helmet title="Star a new game!" />
      <div className={ styles.gameContainer }>
        <button onClick={ onNewGameClick } className={ styles.newGame }>New Game!</button>
      </div>
    </main>
  )
}

Home.displayName = 'Home'

Home.propTypes = {
  startNewGame: func.isRequired,
  gameManager: shape({
    loading: bool.isRequired,
    gameAddress: string.isRequired,
    error: string
  }).isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  gameManager: getGameManagerState(state)
})

const mapDispatchToProps = dispatch => ({
  startNewGame: history => newGame(dispatch, history)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
