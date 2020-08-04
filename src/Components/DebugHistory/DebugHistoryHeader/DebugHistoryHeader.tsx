import React from 'react'
import PropTypes from 'prop-types'

import './DebugHistoryHeader.scss'

interface IDebugHistoryHeaderProps {
  className?: string
}

// Header for history grid. If window width less than 1040px, will be hidden.
function DebugHistoryHeader(props:IDebugHistoryHeaderProps) {
  return (
    <div className={`DebugHistoryHeader ${props.className}`}>
      <div className="DebugHistoryHeader__date">Date</div>
      <div className="DebugHistoryHeader__url">URL</div>
      <div className="DebugHistoryHeader__status">Status</div>
      <div className="DebugHistoryHeader__flags">Flags</div>
      <div className="DebugHistoryHeader__cfStatus">Cloudfront status</div>
      <div className="DebugHistoryHeader__cfPop">Cloudfront pop</div>
    </div>
  )
}

DebugHistoryHeader.typeProps = {
  className: PropTypes.string
}

DebugHistoryHeader.defaultProps = {
  className: ""
}


export default DebugHistoryHeader