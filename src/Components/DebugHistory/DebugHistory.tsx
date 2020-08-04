import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

import IDebugHistoryElement from './IDebugHistoryElement'
import DebugHistoryHeader from './DebugHistoryHeader/DebugHistoryHeader'
import DebugHistoryCell from './DebugHistoryCell/DebugHistoryCell'
import ContentArea from '../ContentArea/ContentArea'

interface IDebugHistoryProps {
  className?: string,
  history: IDebugHistoryElement[]
}

/**
 * Orchester who display Redux `history.elements` elements inside `DebugHistoryCell`
 * If `history.elements` empty, hide `DebugHistoryHeader`.
 **/
 function DebugHistory(props:IDebugHistoryProps) {
  return (
    <div className={props.className}>
      {Array.isArray(props.history) && props.history.length > 0 && (
        <DebugHistoryHeader />
      )}
      {props.history.map((element, index) => 
        <ContentArea className="s-top" key={index}>
          <DebugHistoryCell element={element} index={index}/>
        </ContentArea>
      )}
    </div>
  )
}

DebugHistory.typeProps = {
  className: PropTypes.string
}

DebugHistory.defaultProps = {
  className: "",
  history: []
}

const reducer = (state:any) => ({
  history: state.history.elements
})


export default connect(reducer)(DebugHistory as any as React.ComponentType<IDebugHistoryProps>)