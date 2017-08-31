// @flow
import React, { Component } from 'react'
import { object } from 'prop-types'
import { renderRoutes } from 'react-router-config'

import Header from './components/Header'

// Global CSS
require('./Reset.scss')

class App extends Component {

  static displayName = 'App';

  static propTypes = {
    route: object.isRequired
  };

  render() {
    const styles = require('./App.scss')

    const { route } = this.props

    return (
      <div className={ styles.container }>
        <div className={ styles.stars } />
        <div className={ styles.stars2 } />
        <div className={ styles.stars3 } />
        <Header />
        { renderRoutes(route.routes) }
      </div>
    )
  }
}

export default App
