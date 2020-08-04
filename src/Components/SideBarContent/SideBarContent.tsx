import React from 'react'
import PropTypes from 'prop-types'

import './SideBarContent.scss'

import FasterizeLogo from '../../Pictures/Logos/fasterize.png'

interface ISideBarContentProps {
  children: React.ReactNode
}

/**
 * Composed of 2 parts. first at the right of the page : sideBar with logo and at the left children inside the component.
 * The right side will by hidden smoothly above 600px window width.
 */
function SideBarContent(props:ISideBarContentProps) {
  return (
    <div className="SideBarContent">
      <div className="SideBarContent__sideBar">
        <div className="SideBarContent__sideBar__brand">
          <img src={FasterizeLogo} alt="fasterize brand" className="SideBarContent__sideBar__brand__logo"/>
          <div className="SideBarContent__sideBar__brand__name">
            Fasterize
          </div>
        </div>
      </div>
      <div className="SideBarContent__content">
        {props.children}
      </div>
    </div>
  )
}

SideBarContent.typeProps = {
  children: PropTypes.element
}


export default SideBarContent