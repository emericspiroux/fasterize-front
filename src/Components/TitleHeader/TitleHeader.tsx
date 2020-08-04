import React from 'react'
import PropTypes from 'prop-types'

import './TitleHeader.scss'

interface ITitleHeaderProps {
  title: string
}

/**
 * `TitleHeader` is used to Header at the top of the page which contain a title
 */
function TitleHeader(props:ITitleHeaderProps) {
  return (
    <div className="TitleHeader">
      {props.title}
    </div>
  )
}

TitleHeader.typeProps = {
  title: PropTypes.string
}

export default TitleHeader