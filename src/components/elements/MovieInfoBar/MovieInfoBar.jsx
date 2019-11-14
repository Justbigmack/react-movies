import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import { calcTime, convertMoney } from '../../../helpers'
import styles from './MovieInfoBar.module.scss'

const MovieInfoBar = ({ budget, revenue, time }) => (
  <div className={styles.rmdbMovieinfobar}>
    <div className={styles.rmdbMovieinfobarContent}>
      <div className={styles.rmdbMovieinfobarContentCol}>
        <FontAwesome className={styles.faTime} name="clock-o" size="2x" />
        <span className={styles.rmdbMovieinfobarInfo}>
          Duration: {time ? calcTime(time) : <span>No information found</span>}
        </span>
      </div>
      <div className={styles.rmdbMovieinfobarContentCol}>
        <FontAwesome className={styles.faBudget} name="money" size="2x" />
        <span className={styles.rmdbMovieinfobarInfo}>
          Budget:{' '}
          {budget === 0 ? (
            <span>No information found</span>
          ) : (
            convertMoney(budget)
          )}
        </span>
      </div>
      <div className={styles.rmdbMovieinfobarContentCol}>
        <FontAwesome className={styles.faRevenue} name="ticket" size="2x" />
        <span className={styles.rmdbMovieinfobarInfo}>
          Revenue:{' '}
          {revenue === 0 ? (
            <span>No information found</span>
          ) : (
            convertMoney(revenue)
          )}
        </span>
      </div>
    </div>
  </div>
)

MovieInfoBar.propTypes = {
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  time: PropTypes.number
}

export default MovieInfoBar
