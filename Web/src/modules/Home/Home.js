// @flow
import React from 'react'
import { string, bool, func, object, shape } from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { startGame, getGameState } from './redux'

const styles = require('./Home.scss')

const Home = (props: Object) => {
  const { newGame } = props
  return (
    <main className={ styles.homeMain }>
      <Helmet title="Star a new game!" />
      <button onClick={ newGame } className={ styles.newGame }>New Game<span>!!!</span></button>
    </main>
  )
}

Home.displayName = 'Home'

Home.propTypes = {
  newGame: func.isRequired,
  game: shape({
    loading: bool.isRequired,
    gameAddress: string.isRequired,
    error: string
  }).isRequired
}

const mapStateToProps = state => ({
  game: getGameState(state)
})

const mapDispatchToProps = dispatch => ({
  newGame: () => startGame(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
