// @flow
import React from 'react'
import Helmet from 'react-helmet'

const styles = require('./Home.scss')

const Home = () => (
  <main className={ styles.homeMain }>
    <Helmet title="Star a new game!" />
    <button className={ styles.newGame }>New Game<span>!!!</span></button>
  </main>
)

Home.displayName = 'Home'

export default Home
