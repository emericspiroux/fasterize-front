import React from 'react'
import { connect } from 'react-redux'

import './PopupsContainer.scss'

import PopupCell from './Popupcell/PopupCell'

interface IPopupsContainerProps {
  message:string | undefined
}

/**
 * Container to display notifications popup
 */
function PopupsContainer(props:IPopupsContainerProps) {
  return (
    <div className="PopupsContainer">
        {props.message && (
          <PopupCell message={props.message}/>
        )}
    </div>
  )
}

const reducer = (state:any) => ({
  message: state.popup && state.popup.message
})

export default connect(reducer)(PopupsContainer as any as React.ComponentType<IPopupsContainerProps>)