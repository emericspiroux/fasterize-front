import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ReduxComponent from '../../Redux'

import DebugComponentForm from './DebugComponentForm/DebugComponentForm'

import IDebugComponentFormInputs from './DebugComponentForm/IDebugComponentFormInputs'
import IDebugHistoryElement from '../DebugHistory/IDebugHistoryElement'

interface IDebugComponentProps {
  className?: string,
  addElement(element:IDebugHistoryElement):void
}


/**
 * DebugComponent is used to display form. This form will add an element to history.
 */
function DebugComponent(props:IDebugComponentProps) {

  function onSubmit(inputs:IDebugComponentFormInputs) {
    props.addElement({
      date: (new Date()).toISOString(),
      url: inputs.url,
      isLoading: true
    })
  }

  return (
    <div className={`DebugComponent ${props.className}`}>
      <DebugComponentForm 
        className="s-top"
        onSubmit={onSubmit}
      />
    </div>
  )
}

DebugComponent.typeProps = {
  className: PropTypes.string
}

DebugComponent.defaultProps = {
  className: ""
}

const actionsToProps = (dispatch:Dispatch) => ({
  addElement: ReduxComponent.actions.history.addElement.bind(null, dispatch)
})

export default connect(null, actionsToProps)(DebugComponent as any as FunctionComponent<IDebugComponentProps>)