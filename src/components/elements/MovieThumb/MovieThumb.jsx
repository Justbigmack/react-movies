import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import noImage from '../../../images/no_image.jpg'
import styles from './MovieThumb.module.scss'

const MovieThumb = ({ image, clickable, movieId, movieName }) => (
  <div className={styles.rmdbMoviethumb}>
    {clickable ? (
      <Link to={{ pathname: `/movie/${movieId}`, movieName }}>
        <img src={image ? image : noImage} alt="Movie Thumbnail" />
      </Link>
    ) : (
      <img src={image ? image : noImage} alt="Movie Thumbnail" />
    )}
  </div>
)

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string
}

export default MovieThumb
