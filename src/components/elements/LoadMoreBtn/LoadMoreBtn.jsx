import React from 'react'
import PropTypes from 'prop-types'

import styles from './LoadMoreBtn.module.scss'

const LoadMoreBtn = ({ loadMoreMovies, text }) => (
  <div className={styles.rmdbLoadmorebtn} onClick={() => loadMoreMovies(true)}>
    <p>{text}</p>
  </div>
)

LoadMoreBtn.propTypes = {
  loadMoreMovies: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default LoadMoreBtn
