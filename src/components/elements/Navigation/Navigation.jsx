import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Navigation.module.scss'

const Navigation = ({ movieName, match }) => {
  let name

  if (localStorage.getItem(match.params.movieId)) {
    const item = JSON.parse(localStorage.getItem(match.params.movieId))
    name = item.movie.title
  }

  return (
    <div className={styles.rmdbNavigation}>
      <div className={styles.rmdbNavigationContent}>
        <Link to="/">
          <p>Home</p>
        </Link>
        <p> / {movieName ? movieName : name}</p>
      </div>
    </div>
  )
}

Navigation.propTypes = {
  movieName: PropTypes.string
}

export default withRouter(Navigation)
