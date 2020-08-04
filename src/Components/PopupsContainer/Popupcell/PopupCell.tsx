import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import './PopupCell.scss'

import CustomRedux from '../../../Redux'

interface PopupCellProps {
  message:string,
  deleteMessage():void
}

/**
 * Popup can contain a message.
 */
function PopupCell(props:PopupCellProps) {

  return (
    <div className="PopupCell s-top">
        <div className="PopupCell__message">
          {props.message}
        </div>
        <div className="PopupCell__close" onClick={() => props.deleteMessage()}>
          Close
        </div>
    </div>
  )
}

const actions = (dispatch:Dispatch) => ({
  deleteMessage: CustomRedux.actions.popup.deleteMessage.bind(null, dispatch)
})


export default connect(null, actions)(PopupCell as any as React.ComponentType<PopupCellProps>)