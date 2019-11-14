import React, { Component } from 'react'
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from '../../config'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import HeroImage from '../elements/HeroImage/HeroImage'
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn'
import MovieThumb from '../elements/MovieThumb/MovieThumb'
import SearchBar from '../elements/SearchBar/SearchBar'
import Spinner from '../elements/Spinner/Spinner'
import styles from './Home.module.scss'

export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      let state = JSON.parse(localStorage.getItem('HomeState'))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })

      this.fetchItems(this.createEndpoint('movie/popular', false, ''))
    }
  }

  createEndpoint = (type, loadMore, searchTerm) => {
    const { currentPage } = this.state
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore &&
      currentPage + 1}&query=${searchTerm}`
  }

  updateItems = (loadMore, searchTerm) => {
    this.setState(
      {
        movies: loadMore ? [...this.state.movies] : [],
        loading: true,
        searchTerm: loadMore ? this.state.searchTerm : searchTerm
      },
      () => {
        this.fetchItems(
          !this.state.searchTerm
            ? this.createEndpoint('movie/popular', loadMore, '')
            : this.createEndpoint(
                'search/movie',
                loadMore,
                this.state.searchTerm
              )
        )
      }
    )
  }

  fetchItems = async endpoint => {
    try {
      const { movies, heroImage, searchTerm } = this.state
      const response = await fetch(endpoint)
      const result = await response.json()

      this.setState(
        {
          movies: [...movies, ...result.results],
          heroImage: heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        },
        () => {
          if (searchTerm === '') {
            localStorage.setItem('HomeState', JSON.stringify(this.state))
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {
      currentPage,
      heroImage,
      loading,
      movies,
      searchTerm,
      totalPages
    } = this.state
    return (
      <div className={styles.rmdbHome}>
        <div>
          {heroImage ? (
            <>
              <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${heroImage.backdrop_path}`}
                title={heroImage.original_title}
                text={heroImage.overview}
              />
              <SearchBar callback={this.updateItems} />
            </>
          ) : null}
        </div>
        <div className={styles.rmdbHomeGrid}>
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map(movie => (
              <MovieThumb
                key={movie.id}
                clickable={true}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
          </FourColGrid>
          {loading ? <Spinner /> : null}
        </div>
        {currentPage < totalPages && !loading ? (
          <LoadMoreBtn text="Load More" loadMoreMovies={this.updateItems} />
        ) : null}
      </div>
    )
  }
}
