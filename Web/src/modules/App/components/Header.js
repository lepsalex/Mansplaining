// @flow
import React from 'react'

const Header = () => {
  const styles = require('./Header.scss')

  return (
    <header className={ styles.Header }>
      <h1 className={ styles.title }><span>Mansplaing the game!</span></h1>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
