import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import styles from './SearchBar.module.scss'

export default class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  timeout = null

  onChange = e => {
    const { callback } = this.props
    this.setState({ [e.target.name]: e.target.value })

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      callback(false, this.state.searchTerm)
    }, 500)
  }

  render() {
    return (
      <div className={styles.rmdbSearchbar}>
        <div className={styles.rmdbSearchbarContent}>
          <FontAwesome
            className={styles.rmdbFaSearch}
            name="search"
            size="2x"
          />
          <input
            type="text"
            className={styles.rmdbSearchbarInput}
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}
