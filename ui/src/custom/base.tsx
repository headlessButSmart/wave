import React from 'react'

import { XToolTip } from '../tooltip'


const tooltip_icon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1.9C5.07555 1.9 1.9 5.07582 1.9 9C1.9 12.9245 5.07582 16.1 9 16.1C12.9245 16.1 16.1 12.9242 16.1 9C16.1 5.07555 12.9241 1.9 9 1.9ZM9 14.8062C5.79058 14.8062 3.19375 12.2092 3.19375 9C3.19375 5.79058 5.79079 3.19375 9 3.19375C12.2094 3.19375 14.8062 5.79079 14.8062 9C14.8062 12.2094 12.2092 14.8062 9 14.8062ZM9 7.76046C8.64273 7.76046 8.35313 8.05007 8.35313 8.40734V11.929C8.35313 12.2863 8.64273 12.5759 9 12.5759C9.35727 12.5759 9.64687 12.2863 9.64687 11.929V8.40734C9.64687 8.05007 9.35727 7.76046 9 7.76046ZM9 7.29096C9.46297 7.29096 9.83828 6.91565 9.83828 6.45268C9.83828 5.98971 9.46297 5.61439 9 5.61439C8.53703 5.61439 8.16172 5.98971 8.16172 6.45268C8.16172 6.91565 8.53703 7.29096 9 7.29096Z" fill="#B7B5DE" stroke="#B7B5DE" stroke-width="0.2"/>
  </svg>
)

export const base_render = (name, state, changed, contentDiv) => {
  const
    { cardClass, title, subtitle, description } = state,
    titleDiv = title?(<div className='rie-wave-title'>{title}</div>):null,
    subtitleDiv = subtitle?(<div className='rie-wave-subtitle'>{subtitle}</div>):null,
    headerDiv = (title || subtitle)?(<div className='rie-wave-card-header'>{titleDiv}{subtitleDiv}</div>):null,
    bodyDiv = contentDiv?(<div className={'rie-wave-card-body'}>{contentDiv}</div>):null

  const tooltipDiv = description?(
    <div className='rie-wave-tooltip'>
    <XToolTip content={description} showIcon={false} expand={false}>
      {tooltip_icon}
    </XToolTip>
    </div>
  ):null

  return (
    <div data-test={name} className={'rie-wave-card'+(cardClass?(' '+cardClass):'')+(headerDiv?'':' rie-wave-card-no-header')}>
      {headerDiv}
      {tooltipDiv}
      {bodyDiv}
    </div>
  )
}
