import React from 'react'
import PropTypes from 'prop-types'

import './ContentArea.scss'

interface ContentAreaProps {
  children: React.ReactNode,
  className?: string
}

// Content area with background color white.
function ContentArea(props:ContentAreaProps) {
  return (
    <div className={`ContentArea ${props.className}`}>
      {props.children}
    </div>
  )
}

ContentArea.typeProps = {
  children: PropTypes.element,
  className: PropTypes.string
}

ContentArea.defaultProps = {
  className: ""
}


export default ContentArea