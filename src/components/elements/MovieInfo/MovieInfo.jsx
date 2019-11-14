import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config'
import noImage from '../../../images/no_image.jpg'
import MovieThumb from '../MovieThumb/MovieThumb'
import styles from './MovieInfo.module.scss'

const MovieInfo = ({ directors, movie }) => {
  return (
    directors &&
    movie && (
      <div
        className={styles.rmdbMovieinfo}
        style={{
          background: movie.backdrop_path
            ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
            : '#000'
        }}
      >
        <div className={styles.rmdbMovieinfoContent}>
          <div className={styles.rmdbMovieinfoThumb}>
            <MovieThumb
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : noImage
              }
              clickable={false}
            />
          </div>
          <div className={styles.rmdbMovieinfoText}>
            <h1>{movie.title}</h1>
            <h3>PLOT</h3>
            <p>{movie.overview ? movie.overview : 'No information found'}</p>
            <h3>IMDB RATING</h3>
            <div className={styles.rmdbRating}>
              <meter
                min="0"
                max="100"
                optimum="100"
                low="40"
                high="70"
                value={movie.vote_average * 10}
              ></meter>
              <p className={styles.rmdbScore}>{movie.vote_average}</p>
            </div>
            {directors.length >= 1 ? <h3>DIRECTORS</h3> : null}
            {directors.map((element, i) => {
              return (
                <p key={i} className={styles.rmdbDirector}>
                  {element.name}
                </p>
              )
            })}
          </div>
          <FontAwesome className={styles.faFilm} name="film" size="5x" />
        </div>
      </div>
    )
  )
}

MovieInfo.propTypes = {
  directors: PropTypes.array,
  movie: PropTypes.object.isRequired
}

export default MovieInfo
