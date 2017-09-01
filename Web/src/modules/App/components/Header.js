// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const styles = require('./Header.scss')

  return (
    <header className={ styles.Header }>
      <Link to="/"><h1 className={ styles.title }><span>Mansplaing the game!</span></h1></Link>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
