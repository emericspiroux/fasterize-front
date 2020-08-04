import React from 'react'
import PropTypes from 'prop-types'

import './PageContainer.scss'

interface IPageContainerProps {
  children: React.ReactNode
}

/**
 * His height is equal to 100% - 60px. 60px corresponding to `TitleHeader` height. 
 * This technical choice allow browser to scroll if content is too long, 
 * while maintaining `TitleHeader` at the top of the page.
 */
function PageContainer(props:IPageContainerProps) {
  return (
    <div className="PageContainer">
        {props.children}
        <br/>
        <br/>
    </div>
  )
}

PageContainer.typeProps = {
  children: PropTypes.element
}


export default PageContainer