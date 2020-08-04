import React from 'react'
import PropTypes from 'prop-types'

import './BigTitle.scss'

interface BigTitleProps {
  children: React.ReactNode,
  className?: string
}

// Content title with cyan square and a text
function BigTitle(props:BigTitleProps) {
  return (
    <div className={`BigTitle ${props.className}`}>
      <div className="BigTitle__square" />
      <div className="BigTitle__title">
        {props.children}
      </div>
    </div>
  )
}

BigTitle.typeProps = {
  children: PropTypes.element,
  className: PropTypes.string
}

BigTitle.defaultProps = {
  className: ""
}


export default BigTitle