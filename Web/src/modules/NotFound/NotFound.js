// @flow
import React from 'react'
import Helmet from 'react-helmet'

import status from '../../helpers/status'

const styles = require('./NotFound.scss')

const NotFound = () => {
  status(404)

  return (
    <main className={styles.notFoundMain}>
      <Helmet title="Not Found" />
      <div className={styles.gameContainer}>
        Segmentation Fault! - Just kidding it's only a 404
      </div>
    </main>
  )
}

NotFound.displayName = 'NotFound'

export default NotFound
