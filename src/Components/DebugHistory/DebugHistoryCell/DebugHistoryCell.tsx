import React, { Fragment, FunctionComponent, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './DebugHistoryCell.scss'

import DebugManager from '../../../Api/Managers/DebugManager/index'

import CustomRedux from '../../../Redux'

import IDebugHistoryElement from '../IDebugHistoryElement'
import ApiCanceler from '../../../Api/bin/ApiCanceler'

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'


interface IDebugHistoryCellProps {
  className?: string,
  element: IDebugHistoryElement,
  index: number,
  updateElement(index:number, element:IDebugHistoryElement):void
}

/**
 * DebugHistoryCell can display to the user an `IDebugHistoryElement`.
 * If `IDebugHistoryElement.isLoading` is true, the cell will ask informations to the Api.
 * With this particularity, if user quit the website without waiting API response, 
 * the cell will relaunch api call when he will reopen website.
 **/
function DebugHistoryCell(props:IDebugHistoryCellProps) {

  /**
   * Check if website is plugged and return the concording className string
   */
  function getStatusClassName(element:IDebugHistoryElement):string {
    if (element.details && element.details.plugged)
      return element.details.fstrzFlags && element.details.fstrzFlags.indexOf("optimized") !== -1 ? "plugged" : "halfplugged"
    return "unplugged"
  }

  /**
   * Return array of span with flag text inside with className `DebugHistoryCell__flags__element`. 
   * If no flag detected, return a span with className `DebugHistoryCell__flags__element error`
   */
  function getFasterizeFlags(flags:string[] | undefined):JSX.Element[] {
    if (!(flags && flags.length > 0) || !flags) 
      return [<span className="DebugHistoryCell__flags__element error">No flags detected</span>]
    return flags.map((flag, index) => (
      <span className="DebugHistoryCell__flags__element" key={index}>{flag}</span>
    ))
  }

  /**
   * Getting `JSX.Element` with status text with className `DebugHistoryCell__cfStatus__element`. 
   * If no status or "MISS" status value will add `error` className
   * @param status string status fetched from the api response
   */
  function getCloudFrontStatus(status:string | undefined):JSX.Element {
    if (!status) 
      return (
        <span className="DebugHistoryCell__cfStatus__element error">No cloud front status</span>
      )
    return (
      <div className={`DebugHistoryCell__cfStatus__element ${status === "MISS" ? "error" : ""}`}>{status}</div>
    )
  }

  /**
   * Permit to fetch informations about `IDebugHistoryElement.url`. Fill `IDebugHistoryElement.details` attribute with api response.
   * @param index Position of element inside `IDebugHistoryElement[]`
   * @param element `IDebugHistoryElement`, must have valid url.
   * @param canceler Cancel callback who give Axios canceler in parameters.
   */
  async function fetchInformations(index:number, element:IDebugHistoryElement, canceler:ApiCanceler = (() => {})) {
    element.isLoading = true
    props.updateElement(index, element)
    try {
      let response = await DebugManager.getInformationsAbout(element.url, canceler)
      element.details = response.data
      element.error = undefined
    } catch (err) {
      element.error = err
    }
    element.isLoading = false
    props.updateElement(index, element)
  }

  // Detect if `IDebugHistoryElement.isLoading` change and value and call api if ```isLoading = true```
  useEffect(() => {
    if (props.element.isLoading)
      fetchInformations(props.index, props.element)// eslint-disable-next-line
  }, [props.element.isLoading])

  return (
    <div className={`DebugHistoryCell ${props.className}`}>
      <div className="DebugHistoryCell__column DebugHistoryCell__date">
        <span className="DebugHistoryCell__mobile__title">Date:</span>
        {moment(props.element.date).format('DD/MM/YYYY')}
      </div>
      <div className="DebugHistoryCell__column DebugHistoryCell__url">
        <span className="DebugHistoryCell__mobile__title">URL:</span>
        {props.element.url}
      </div>
      <div className="DebugHistoryCell__column DebugHistoryCell__status">
        {props.element.isLoading ? (
          <LoadingSpinner />
        ) : props.element.error ? (
          <div className="DebugHistoryCell__column DebugHistoryCell__status__error">
            {props.element.error.message}
          </div>
        ) : (
          <FontAwesomeIcon icon={["fas", "cloud"]} size="2x" className={`DebugHistoryCell__status__icon ${getStatusClassName(props.element)}`} />
        )}
      </div>
      {props.element.details && props.element.details.plugged && (
        <Fragment>
          <div className="DebugHistoryCell__column DebugHistoryCell__flags">
            <span className="DebugHistoryCell__mobile__title">Flags:</span>
            {getFasterizeFlags(props.element.details.fstrzFlags)}
          </div>
          <div className="DebugHistoryCell__column DebugHistoryCell__cfStatus">
            <span className="DebugHistoryCell__mobile__title">Cloudfront Status:</span>
            {getCloudFrontStatus(props.element.details.cloudfrontStatus)}
          </div>
          <div className="DebugHistoryCell__column DebugHistoryCell__cfPop">
            <span className="DebugHistoryCell__cfPop__element">
              <span className="DebugHistoryCell__mobile__title">Cloudfront POP:</span>
              {props.element.details.cloudfrontPOP || "Unknown"}
            </span>
          </div>
        </Fragment>
      )}
    </div>
  )
}

DebugHistoryCell.typeProps = {
  className: PropTypes.string,
  element: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

DebugHistoryCell.defaultProps = {
  className: ""
}


const actionsToProps = (dispatch:Dispatch) => ({
  updateElement: CustomRedux.actions.history.updateElement.bind(null, dispatch)
})

export default connect(null, actionsToProps)(DebugHistoryCell as any as FunctionComponent<IDebugHistoryCellProps>)