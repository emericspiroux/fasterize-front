import React from 'react'
import PropTypes from 'prop-types'

import './LoadingSpinner.scss'

interface ILoadingSpinnerProps {
  className?: string
}

/**
 * Display looping wheel who indicate to use that something happen and he need to waiting a while.
 * TODO: Can be improve by give size inside props instead of hard coding it inside css.
 */
function LoadingSpinner(props:ILoadingSpinnerProps) {
  return (
    <div className={`LoadingSpinner ${props.className}`}/>
  )
}

LoadingSpinner.typeProps = {
  className: PropTypes.string
}

LoadingSpinner.defaultProps = {
  className: ""
}



export default LoadingSpinner