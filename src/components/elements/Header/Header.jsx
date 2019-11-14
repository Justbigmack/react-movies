import React from 'react'
import { Link } from 'react-router-dom'

import rmdbLogo from '../../../images/reactMovie_logo.png'
import tmdbLogo from '../../../images/tmdb_logo.png'
import styles from './Header.module.scss'

const Header = () => (
  <div className={styles.rmdbHeader}>
    <div className={styles.rmdbHeaderContent}>
      <Link to="/">
        <img className={styles.rmdbLogo} src={rmdbLogo} alt="Logo" />
      </Link>
      <a href="https://www.themoviedb.org">
        <img className={styles.rmdbTmdbLogo} src={tmdbLogo} alt="TMDB logo" />
      </a>
    </div>
  </div>
)

export default Header
