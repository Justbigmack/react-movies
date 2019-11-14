import React, { Component } from 'react'

import { API_URL, API_KEY } from '../../config'
import Actor from '../elements/Actor/Actor'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import MovieInfo from '../elements/MovieInfo/MovieInfo'
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar'
import Navigation from '../elements/Navigation/Navigation'
import Spinner from '../elements/Spinner/Spinner'
import styles from './Movie.module.scss'

export default class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: null,
    loading: false
  }

  componentDidMount() {
    const { movieId } = this.props.match.params
    window.scrollTo(0, 0)
    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`

      this.fetchItems(endpoint)
    }
  }

  fetchItems = async endpoint => {
    const { movieId } = this.props.match.params
    try {
      const response = await fetch(endpoint)
      const result = await response.json()
      if (result.status_code) {
        this.setState({ loading: false })
      } else {
        this.setState({ movie: result }, async () => {
          let creditEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
          const creditResponse = await fetch(creditEndpoint)
          const creditResult = await creditResponse.json()

          console.log(creditResult)
          const directors = creditResult.crew.filter(
            member => member.job === 'Director'
          )

          this.setState(
            {
              actors: creditResult.cast,
              directors,
              loading: false
            },
            () => {
              localStorage.setItem(`${movieId}`, JSON.stringify(this.state))
            }
          )
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { actors, directors, movie } = this.state
    const { movieName } = this.props.location
    return (
      <div className={styles.rmdbMovie}>
        {movie && actors ? (
          <React.Fragment>
            <Navigation movieName={movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />

            <div className={styles.rmdbMovieGrid}>
              <FourColGrid header={'Actors'}>
                {actors.map((actor, i) => (
                  <Actor key={i} actor={actor} />
                ))}
              </FourColGrid>
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}
