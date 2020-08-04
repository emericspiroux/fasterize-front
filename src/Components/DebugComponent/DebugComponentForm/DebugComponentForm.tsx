import React, { FormEvent, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import IDebugComponentFormInputs from './IDebugComponentFormInputs'
import './DebugComponentForm.scss'
import FormCheck from '../../../Helpers/FormCheck/FormCheck'
import FormCheckEnum from '../../../Helpers/FormCheck/FormCheckEnum'

interface DebugComponentFormProps {
  className?: string,
  onSubmit(inputs:IDebugComponentFormInputs):void
}

/**
 * Form who contain url input with a button. If url input empty or not valid, 
 * it will display a red error at the bottom of the form.
 * Return IDebugComponentFormInputs on onSubmit when user click on button.
 * onSubmit is not triggered if error is detected.
 */
function DebugComponentForm(props:DebugComponentFormProps) {
  const [hasError, setHasError] = useState(false)
  const [errorText, _setErrorText] = useState("")
  let urlInput = useRef<HTMLInputElement | null>(null)

  /**
   * Set the error text and set hasError to true.
   * @param text the error text displayed at the bottom of the form
   */
  function setErrorText(text:string) {
    _setErrorText(text)
    setHasError(true)
  }

  /**
   * Triggered when user click on the form button.
   * Check url validity and presence. If not call `setErrorText` with error explanation
   * @param e Form event
   */
  function onSubmit(e:FormEvent) {
    e.preventDefault()
    let inputUrl = urlInput.current 
    let inputUrlValue = (inputUrl && inputUrl.value) || ""
    if (!inputUrlValue) return setErrorText("URL can't be empty")
    let formChecker = new FormCheck(inputUrlValue, FormCheckEnum.url)
    if (!formChecker.isValid) return setErrorText("URL must be valid")
    props.onSubmit({
      url: inputUrlValue
    })
    if (inputUrl) inputUrl.value = ""
  }

  // Permit to hide error block when user change input text
  function onChange() {
    setHasError(false)
  }

  return (
    <div className={`DebugComponentForm ${props.className}`}>
      <form onSubmit={onSubmit} className="DebugComponentForm__form">
        <div className="DebugComponentForm__form__wrapper">
          <input 
            type="text"
            name="url"
            placeholder="https://website.com"
            ref={urlInput}
            onChange={onChange}
            className={`DebugComponentForm__form__wrapper__urlInput ${hasError ? "error" : ""}`}
          />
          <button className="blue DebugComponentForm__form__wrapper__button">LAUNCH ANALYSIS</button>
        </div>
        <div className={`FaterizeErrorContainer ${hasError ? "open" : ""} DebugComponentForm__form__errorWrapper`}>
          {errorText}
        </div>
      </form>
    </div>
  )
}

DebugComponentForm.typeProps = {
  className: PropTypes.string,
  onSubmit: PropTypes.func
}

DebugComponentForm.defaultProps = {
  className: "",
  onSubmit: (()=>{})
}


export default DebugComponentForm