import React from 'react'
import PropTypes from 'prop-types'

import styles from './HeroImage.module.scss'

const HeroImage = ({ image, title, text }) => (
  <div
    className={styles.rmdbHeroimage}
    style={{
      background: `linear-gradient(to bottom, rgba(0,0,0,0)
          39%,rgba(0,0,0,0)
          41%,rgba(0,0,0,0.65)
          100%),
          url('${image}'), #1c1c1c`
    }}
  >
    <div className={styles.rmdbHeroimageContent}>
      <div className={styles.rmdbHeroimageText}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  </div>
)

HeroImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default HeroImage
