import React from 'react'
import PropTypes from 'prop-types'

import styles from './FourColGrid.module.scss'

const FourColGrid = ({ children, header, loading }) => {
  const renderElements = () => {
    return children.map((element, i) => (
      <div key={i} className={styles.rmdbGridElement}>
        {element}
      </div>
    ))
  }

  return !loading ? (
    <div className={styles.rmdbGrid}>
      {header && !loading ? <h1>{header}</h1> : null}
      <div
        className={
          children.length >= 1
            ? styles.rmdbGridContent
            : styles.rmdbGridContentNull
        }
      >
        {children.length >= 1 ? renderElements() : <p>No information found</p>}
      </div>
    </div>
  ) : null
}

FourColGrid.propTypes = {
  header: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

export default FourColGrid
