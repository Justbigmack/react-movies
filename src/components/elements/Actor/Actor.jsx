import React from 'react'
import PropTypes from 'prop-types'

import { IMAGE_BASE_URL } from '../../../config'
import noImage from '../../../images/no_image.jpg'
import styles from './Actor.module.scss'

const Actor = ({ actor }) => {
  const POSTER_SIZE = 'w342'

  return (
    <div className={styles.rmdbActor}>
      <a href={`https://www.themoviedb.org/person/${actor.id}`} target="blank">
        <img
          src={
            actor.profile_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
              : noImage
          }
          alt="actorthumb"
        />
        <span className={styles.rmdbActorName}>{actor.name}</span>
        <span className={styles.rmdbActorCharacter}>{actor.character}</span>
      </a>
    </div>
  )
}

Actor.propTypes = {
  actor: PropTypes.object.isRequired
}

export default Actor
